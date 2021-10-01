$(document).ready(function() {
    // navbar
    const menu = $(".header__menu");
    const hamburger = $(".hamburger");
    const links = document.querySelectorAll(".header__menu li");

    hamburger.on("click", () => {
        menu[0].classList.toggle("open");
        links.forEach(link => {
            link.classList.toggle("fade");
        });
        if (menu.hasClass("open")) {
            $("body").css({ "overflow": "hidden" }, { "-webkit-overflow": "hidden" }, );
        } else {
            $("body").css({ "overflow": "auto" }, { "-webkit-overflow": "auto" });
        }
    });

    // scrolldown
    $(".letsgo__arrow").on("click", function() {
        document.querySelector('#start').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // survey flow
    const questions = ['Question 1', 'Question 2', 'Question 3'];
    const answers = [
        { one: { answ1: 'Answer 1 (1)', answ2: 'Answer 2 (1)' } },
        { two: { answ1: 'Answer 1 (2)', answ2: 'Answer 2 (2)' } },
        { three: { answ1: 'Answer 1 (3)', answ2: 'Answer 2 (3)' } }
    ];
    let question = $(".survey__question h4");
    let answer1 = $(".answer-one");
    let answer2 = $(".answer-two");

    let i = 0;
    question.append(questions[i]);
    answer1.append(answers[i].one.answ1);
    answer2.append(answers[i].one.answ2);

    let statusOne = $(".survey__status span.status__first");
    let statusTwo = $(".survey__status span.status__second");
    let statusThree = $(".survey__status span.status__third");

    $(".btn-start").on("click", function() {
        $(".header__bot, #welcome, #social, #start, #testimonial, footer").hide();
        $("#steps, #survey").fadeIn(1000);
        $(".steps__content").hide();
        $("body").css({ "background": "#ff954b" });

        statusShow();
        setTimeout(function() {
            $(".survey__loading").hide();
            $(".survey__content, .steps__content").fadeIn(1000);
        }, 4000);
    });

    function statusShow() {
        setTimeout(function() {
            statusOne.fadeIn(1000);
        }, 1000);
        setTimeout(function() {
            statusTwo.fadeIn(1000);
        }, 2000);
        setTimeout(function() {
            statusThree.fadeIn(1000);
        }, 3000);
    }

    function nextStep() { // switching to next step
        console.log("next step");
        $(".steps__content").hide();
        $(".step.step__current")
            .addClass("step__done")
            .removeClass("step__current")
            .next().addClass("step__current");
    }

    let btnAnswer = $(".survey__answers button");

    btnAnswer.on("click", function() {
        i++;
        if (i == (questions.length - 1)) {
            console.log("second");
            nextStep();
        }
        $(".survey__content, .survey__status span").hide();
        $(".survey__loading").fadeIn(1000);
        if (i < questions.length) {
            statusOne.html("Saving answer...");
            statusTwo.html("Loading next question...");
            statusThree.html("Loading next answers...");

            setTimeout(function() {
                statusOne.fadeIn(1000);
            }, 500);
            setTimeout(function() {
                statusTwo.fadeIn(1000);
            }, 800);
            setTimeout(function() {
                statusThree.fadeIn(1000);
            }, 1100);
            setTimeout(function() {
                $(".survey__loading").hide();
                $(".survey__content, .steps__content").fadeIn(1500);
            }, 1500);
        }

        question.html('');
        answer1.html('');
        answer2.html('');
        question.append(questions[i]);
        if (i == 1) {
            answer1.append(answers[i].two.answ1);
            answer2.append(answers[i].two.answ2);
        } else if (i == 2) {
            answer1.append(answers[i].three.answ1);
            answer2.append(answers[i].three.answ2);
        } else if (i == questions.length) { // verifying if question is final
            console.log("FINISH");
            console.log('final');
            nextStep();

            statusOne.html("Proccessing answers...");
            statusTwo.html("Finishing survey...");
            statusThree.html("Loading giftcard...");

            statusShow();
            setTimeout(function() {
                $("#survey").hide();
                $("#complete, .steps__content").fadeIn(1000);
            }, 4000);
        }
    });
});