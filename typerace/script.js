const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
var executed = false
text = ""
timertxt = "30"
i = 0
textIndex = 0
second = 30

function timer() {
    second--
    timertxt = second
    if (second === 0) {
        clearInterval(cron)
        seconds = 30
        timertxt = seconds
        i = 0
        textIndex = 0
        typer.draw()
        alert("voce perdeu D:")
    }
}

function timerTrigger() {
    if (!executed) {
        executed = true;
        cron = setInterval(timer, 1000)
    }
}


class Type {
    constructor(texts, time) {
        this.texts = texts
        this.time = time
    }

    draw() {
        if (textIndex < typer.texts.length) {
            var txt = this.texts[textIndex]
            c.font = "20px Arial"
            c.fillStyle = "gray"
            printAt(c, txt, 50, 100, 40, 700);

            
            function printAt(context, text, x, y, lineHeight, fitWidth) {
                fitWidth = fitWidth || 0;

                if (fitWidth <= 0) {
                    context.fillText(text, x, y);
                    return;
                }

                for (var idx = 1; idx <= text.length; idx++) {
                    var str = text.substr(0, idx);
                    if (context.measureText(str).width > fitWidth) {
                        context.fillText(text.substr(0, idx - 1), x, y);
                        printAt(context, text.substr(idx - 1), x, y + lineHeight, lineHeight, fitWidth);
                        return;
                    }
                }
                context.fillText(text, x, y);
            }
        }
    }

    type() {
        c.font = "20px Arial"
        c.fillStyle = "black"
        text += this.texts[textIndex][i]
        /*  c.fillText(text, 50, 100, 500) */
        printAt(c, text, 50, 100, 40, 700);

        
        function printAt(context, text, x, y, lineHeight, fitWidth) {
            fitWidth = fitWidth || 0;

            if (fitWidth <= 0) {
                context.fillText(text, x, y);
                return;
            }

            for (var idx = 1; idx <= text.length; idx++) {
                var str = text.substr(0, idx);
                if (context.measureText(str).width > fitWidth) {
                    context.fillText(text.substr(0, idx - 1), x, y);
                    printAt(context, text.substr(idx - 1), x, y + lineHeight, lineHeight, fitWidth);
                    return;
                }
            }
            context.fillText(text, x, y);
        }


    }
}

const typer = new Type(["Lorem, ipsum dolor sit amet consectetur adipisicing elit.", "Recusandae, neque cupiditate. Ducimus perspiciatis", "ut magni fugit eligendi tenetur dolor eos consequuntur"], 30) 

function nextText() {
    if (i == typer.texts[textIndex].length) {
        textIndex++
        i = 0
        c.clearRect(0, 0, canvas.width, canvas.height)
        text = ""
        typer.draw()
    }
}


typer.draw()

addEventListener("keydown", (e) => {
    if (textIndex < typer.texts.length) {
        if (e.key === typer.texts[textIndex][i]) {
            typer.type()
            i++
            nextText()
            timerTrigger()
        }
    }
})


function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, 40)
    c.fillText(timertxt, 50, 40)
    if (textIndex + 1 > typer.texts.length) {
        alert("uau vc ganho")
        clearInterval(cron)
        seconds = 30
        timertxt = seconds
        i = 0
        textIndex = 0
        typer.draw()
    }
}

animate()

