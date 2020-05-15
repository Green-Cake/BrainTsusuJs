@file:Suppress("EXPERIMENTAL_UNSIGNED_LITERALS")

import org.w3c.dom.HTMLTextAreaElement
import kotlin.browser.document

enum class Mode {
    NORMAL,
    JUMP_F,
    JUMP_B
}

fun getTextArea(id: String) = (document.getElementById(id) as HTMLTextAreaElement)

fun run() {

    val src = getTextArea("input").value
            .replace("(//.*$)".toRegex(RegexOption.MULTILINE), "")
            .replace("\n|\r|\\s|　|\t".toRegex(), "")

    getTextArea("output").value = ""

    var cur = 0
    val heap = Array<UByte>(512) { 0u }
    var ptr = 0
    var mode = Mode.NORMAL

    fun getToken(i: Int) = src[i*2].toString() + src[i*2+1]

    a@while(cur*2+1 < src.length) {

        when (mode) {
            Mode.JUMP_F -> {
                var d = 0
                while (true) {
                    if (getToken(cur) == "うつ")
                        d++
                    else if (getToken(cur) == "うす")
                        d--
                    if (getToken(cur) == "うす" && d == 0)
                        break
                    ++cur
                }
                ++cur
                mode = Mode.NORMAL
                continue@a
            }
            Mode.JUMP_B -> {
                var d = 0
                while (true) {
                    if (getToken(cur) == "うす")
                        d++
                    else if (getToken(cur) == "うつ")
                        d--
                    if (getToken(cur) == "うつ" && d == 0)
                        break
                    --cur
                }
                ++cur
                mode = Mode.NORMAL
                continue@a
            }

            else -> when (getToken(cur)) {
                "つつ" -> ++ptr
                "つす" -> --ptr
                "つう" -> heap[ptr]++
                "すつ" -> heap[ptr]--
                "すす" -> getTextArea("output").value += (heap[ptr].toInt().toChar().toString())
//                "すう" -> heap[ptr] = readLine()?.get(0)?.toByte()?.toUByte() ?: 0u
                "うつ" -> if (heap[ptr] == 0u.toUByte()) {
                    mode = Mode.JUMP_F; continue@a
                }
                "うす" -> if (heap[ptr] != 0u.toUByte()) {
                    mode = Mode.JUMP_B; continue@a
                }
                "うう" -> getTextArea("output").value += (heap[ptr].toString())
                "まて" -> { }//the behaviors appear to be not fine so unimplemented.
            }

        }

        ++cur
    }


}