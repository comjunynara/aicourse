//application js

var has_block = false;

var overlay_contnet, title, subtitle;
title = '<h5 class="title is-5">' + page_info.title + "</h5>";
subtitle =
    '<h6 class="subtitle is-6">' +
    config.page_type[parseInt(currentPage)].title +
    "</h6>";
var summaryUrl = `${currentPage}.html`;

function closeNav() {
    //document.getElementById("side-menu").style.width = "0";
    $("#side-menu").css("left", "-297px");
    setTimeout(function () {
        $("#side-menu").css("overflow-y", "hidden");
    }, 400);

    $(".video-dim").hide();
}

function goNextPage() {
    console.log("has_block : " + has_block);

    var target = parseInt(currentPage, 10) + 1;
    if (has_block) {
        $("#modal-require-quiz-process p.comment").html(
            "평가하기의 모든 항목을 확인해주세요."
        );

        $("#modal-require-quiz-process").addClass("is-active");
        setTimeout(function () {}, 3000);
    } else {
        if (target <= totalPage) {
            document.location.href = numToNDigitStr(target, 2) + ".html";
        } else {
            alert("마지막 페이지 입니다.");
        }
    }
}

function goPrevPage() {
    var target = parseInt(currentPage, 10) - 1;
    if (target >= 1) {
        document.location.href = numToNDigitStr(target, 2) + ".html";
    } else {
        alert("첫 페이지 입니다.");
    }
}

function createCompetencyElements() {
    var el_str = `<div class="competency-wrap box">
        <p class="competency-title">본 과정에 앞서 진행되는 진단은<br><strong class="point">학습자의 역량 수준을 확인하고<br>자신의 직무역량에 맞는 보완학습을 위한 진단</strong>입니다.</p>
        <p class="competency-text">총 <strong class="point">30</strong>문항으로 구성된 역량진단은<br>학습자수준을 초급, 중급, 고급으로 구분하여<br><strong class="point">학습자 수준에 맞는 보완학습자료를 제공</strong>하고 있습니다.</p>
        <button class="competency-btn is-link" id="competency-test">역량진단 바로가기</button>
    </div>`;

    extraContentInit(el_str, $(".modal-content"));

    $(".competency-btn").on("click", function () {
        window.open(
            config.competency_test_path,
            "_blank",
            "toolbar=no,scrollbars=yes,resizable=yes,width=1024,height=700"
        );
    });
}

function initializeUtilButtons(downloadButtonId, subWrapClass) {
    if (config.extra_resources && !$("#down-extra").length) {
        var btn_str = `<a href="#none" id="down-extra" role="button">추가자료</a>`;
        $(".down-sub-wrap").append(btn_str);
        $("#down-extra").click(function () {
            $.each(config.learning_extra_list, function (key, value) {
                var link = config.extra_resources_path + value.file_name;
                $("#down-extra").attr({
                    href: link,
                    target: "_blank",
                });
            });
        });
    }

    if (config.script_resources && !$("#down-script").length) {
        var script_str = `<a href="javascript:void(0)" id="down-script" role="button">강의교안</a>`;
        $(".down-sub-wrap").append(script_str);

        $("#down-script").on("click", function () {
            let path = config.script_path + currentChapter + ".pdf";

            if (config.script_zip.includes(currentChapter)) {
                path = config.script_path + currentChapter + ".zip";
            }

            $("#down-script").attr({
                href: path,
                target: "_blank",
            });
        });
    }

    // $(`#${downloadButtonId}-print`).off("click").on("click", function() {
    //     // 요약정리 인쇄
    //     var path = config.summary_path + currentChapter + ".pdf";
    //     window.print(path);
    //     console.log(path);
    // });

    $(`#${downloadButtonId}-print`)
        .off("click")
        .on("click", function () {
            // 요약정리 인쇄
            var path = config.summary_path + currentChapter + ".pdf";
            var printWindow = window.open(path, "_blank");
            $(printWindow).on("load", function () {
                printWindow.print();
            });
        });

    $(`#${downloadButtonId}-download`)
        .off("click")
        .on("click", function () {
            $(`.${subWrapClass} .down-sub-wrap`).toggleClass("is-active");
        });

    $(`#${downloadButtonId}-download-summary`)
        .off("click")
        .on("click", function () {
            var path = config.summary_path + currentChapter + ".pdf";
            $(`#${downloadButtonId}-download-summary`).attr({
                href: path,
                target: "_blank",
            });
        });

    $(`#${downloadButtonId}-supply`)
        .off("click")
        .on("click", function () {
            $.each(config.learning_resources_list, function (key, value) {
                var link = config.learning_resources_path + value.file_name;
                $(`#${downloadButtonId}-supply`).attr({
                    href: link,
                    target: "_blank",
                });
            });
        });
}

function contentUrl() {
    var content_path, content_name, content_extension;
    content_path = config.content_path + currentChapter;
    content_name = currentPage;
    content_extension =
        config.page_type[parseInt(currentPage)].content_extension;

    if (content_extension === "") {
        content_path = config.empty_path;
        content_name = "empty";
        content_extension = "mp3"; // 기본값을 mp3로 설정
        $(".vjs-play-progress.vjs-slider-bar").css("width", "100%");
        $(".vjs-load-progress").css("width", "100%");
    }

    return content_path + "/" + content_name + "." + content_extension;
}

function extraContentInit(element, target) {
    //console.log("extraContentInit");

    $(target).show().append(element);
    // $(".content-wrap")opinion-pic
    //     .show()
    //     .append(element);
}

function opinionElementInit() {
    var opinion_element =
        '<div id="opinion"><div class="opinion-wrap columns is-marginless animated fadeIn"><div class="opinion-pic column is-one-third animated slideInLeft fadeIn "></div><div id="opinion-question-area" class="column"><div class="opinion-question-inner-wrap"><div id="opinion-question-title" class="media animated fadeIn delay-0_25s"><div class="media-left"> <figure class="image is-24x24"> <img src="../common/images/opinion/opinion_bullet.png"> </figure></div><div class="media-content"><p>sub title here</p></div></div><div id="opinion-question-sub-title" class="media animated fadeIn delay-0_5s"><div class="media-left"> <figure class="image is-24x24"> <img src="../common/images/opinion/opinion_symbol.png"> </figure></div><div class="media-content"><p>sub title here</p></div></div><div id="opinion-question-body" class="exam animated fadeIn delay-0_75s"><p>body here</p></div></div><div class="opinion-question-inner-wrap"><div class="form"><textarea name="input-area" id="input-area" rows="5"></textarea><div class="actions"> <button id="btn-save" class="btn">저장하기</button> <button id="btn-opinion" class="btn button is-primary is-large modal-button" data-target="modal-opinion"> 전문가 의견보기 </button></div></div></div></div></div></div>';
    extraContentInit(opinion_element, $(".content-wrap"));
    $("#opinion-question-title .media-content").html(page_info.opinion.title);
    $("#opinion-question-sub-title .media-content").html(
        page_info.opinion.sub_title
    );
    $("#opinion-question-body").html(page_info.opinion.body);

    if (page_info.opinion.modal_content) {
        $("#opinion-modal-content").html(page_info.opinion.modal_content);
    } else {
        $("#btn-opinion").hide();
        $("#opinion-modal-content").hide();
    }

    var opinion_name =
        "opinion_" + encodeURIComponent(page_info.title) + "_" + currentChapter;
    if (Cookies.get(opinion_name)) {
        $("#opinion-question-area #input-area").val(
            decodeURIComponent(Cookies.get(opinion_name))
        );
    }

    $("button#btn-save").click(function () {
        if ($("#input-area").val().length > 0) {
            Cookies.set(
                opinion_name,
                encodeURIComponent($("#input-area").val()),
                {
                    expires: config.cookie_expire,
                }
            ); // 쿠키저장
            //console.log(encodeURIComponent($("#input-area").val()));

            $("#modal-opinion-alert p.comment").html("저장 되었습니다.");
            $("#modal-opinion-alert").addClass("is-active");
            setTimeout(function () {
                $("#modal-opinion-alert").removeClass("is-active");
                clearTimeout(this);
            }, 3000);
        } else {
            $("#modal-opinion-alert p.comment").html(
                "내용을<br/>입력해주세요."
            );
            $("#modal-opinion-alert").addClass("is-active");
            setTimeout(function () {
                $("#modal-opinion-alert").removeClass("is-active");
                clearTimeout(this);
            }, 3000);
        }
    });
}

function goalElementInit() {
    //goal
    var goal_element = displayGoal();
    extraContentInit(goal_element, $(".content-wrap"));
}

function quizElementInit() {
    //quiz
    var quiz_length = Object.keys(page_info.quiz).length;
    var quiz_element = `<div id="quiz"class="container is-fullhd"><div id="intro"class="columns is-marginless"><div class="quiz-intro-left animated fadeInLeft column"></div><div class="quiz-intro-right intro-wrap animated fadeInLeft column"><h2 class="intro-title">평가하기</h2><section class="intro-section"><p class="intro-belt">학습한 내용을 퀴즈로 풀어보겠습니다.<br>문제를 잘 읽고 알맞은 답을 선택해 주세요.</p><p class="intro-text">문제는<span> ${quiz_length}</span> 문제이며,<br>정답을 선택할 수 있는<br>기회는<span> ${
        try_count + 1
    }</span>번 주어집니다.</p><button id="start-quiz">start</button></section></div></div><div id="assessment"class=""></div><div id="result"class=""><div class="result-title"><strong>결과 확인</strong></div><div class="result-feedback"><p class="feedback-message feed-success">학습을 훌륭히 진행하셨네요!</p><p class="feedback-message feed-failed">다시 한번 도전해 보세요!</p></div><div class="result-table"></div><div class="actions result-actions"><button id="retry" class="quiz-result-btn">다시풀기</button><button id="next-page" class="quiz-result-btn" onclick="javascript:goNextPage();">다음 페이지 보기</button></div></div></div>`;
    extraContentInit(quiz_element, $(".content-wrap"));
}

function summaryElementInit() {
    //summary
    var summary_element = `<div class="summary-wrap"><h2 class="summary-menu-title">요약정리</h2><div class="actions"><button id="summary-print"class="btn-util is-disabled">인쇄하기</button><div class="util-wrap summary-util-wrap"><button id="summary-download" class="btn-util">다운로드</button><div class="down-sub-wrap"><a href="#none"role="button"id="summary-download-summary">요약정리</a><a href="#none" role="button" id="summary-supply" class="not-used">보충심화</a></div></div></div><div class="summary-content"></div><ul id="paginate"></ul></div>`;
    var summary_print_element =
        '<section class="print-area"><h1 class="print title"></h1><h2 class="print subtitle"></h2></section>';

    extraContentInit(summary_element, $(".content-wrap"));
    extraContentInit(summary_print_element, $("main"));

    initializeUtilButtons("summary", "summary-util-wrap");
}

function runningMapInit() {
    // running map
    var modalTitle = `<h2 class="modal-map-title">러닝맵</h2>`;
    var utilMenu = `<div class="actions"><button id="map-print" class="btn-util not-used">인쇄하기</button><div class="util-wrap map-util-wrap"><button id="map-download" class="btn-util">다운로드</button><div class="down-sub-wrap"><a href="#none" role="button" id="map-download-summary" class="not-used">요약정리</a><a href="#none" role="button" id="map-supply" class="not-used">보충심화</a></div></div></div>`;

    $("#modal-map .modal-content").prepend(modalTitle);
    $("#modal-map .modal-content").append(utilMenu);

    initializeUtilButtons("map", "map-util-wrap");

    content_data.forEach(function (element, index) {
        var newChapter = document.createElement("li");
        var chapterName = document.createTextNode(element.title);
        newChapter.appendChild(chapterName);

        if (Number(currentChapter) - 1 === index) {
            newChapter.classList.add("has-text-primary");
            //$(".subtitle").html(element);
        }

        $(".chapter-list").append(newChapter);
    });
}

function displayClassTitle() {
    var classTitle = page_info.title;
    var className = `<div class="class-wrap"><h2 class="class-num">${currentChapter} 차시</h2><p class="class-title ellipsis line_3">${classTitle}</p></div>`;

    extraContentInit(className, $(".content-wrap"));
}

function displayGoal() {
    let chapterList = document.createElement("div");
    chapterList.className = "map-goal-list";

    // 목표(goal) 출력
    let goalList = document.createElement("ul");
    goalList.className = "goal-title-list";

    for (let key in page_info.goal) {
        if (page_info.detail.hasOwnProperty(key)) {
            let listItem = document.createElement("li");

            let paragraph = document.createElement("p");
            paragraph.className = "ellipsis line_3";
            paragraph.textContent = page_info.goal[key];

            listItem.appendChild(paragraph);
            goalList.appendChild(listItem);
        }
    }

    // 세부사항(detail) 출력
    let detailList = document.createElement("ul");
    detailList.className = "goal-detail-list";

    for (let key in page_info.detail) {
        if (page_info.detail.hasOwnProperty(key)) {
            let listItem = document.createElement("li");

            let paragraph = document.createElement("p");
            paragraph.className = "ellipsis line_3";
            paragraph.textContent = page_info.detail[key];

            listItem.appendChild(paragraph);
            detailList.appendChild(listItem);
        }
    }

    // HTML 요소에 추가
    chapterList.appendChild(goalList);
    chapterList.appendChild(detailList);

    extraContentInit(chapterList, $(".content-wrap"));
}

function fullScreenExit() {
    screenfull.on("change", function () {
        if (!screenfull.isFullscreen) {
            $(".fa-compress").attr("class", "fas fa-expand fa-lg");
            $(".player-dimensions.vjs-fluid").removeClass("full-screen-height");
            $(".content-wrap").removeClass("type-full-screen");
        }
    });
}

function indexInit() {
    var menuContentWrap = $(".menu-content-wrap");
    var mainMenuList = '<ul class="main-menu-list">';
    var menuCloseButton =
        '<button class="menu-close" aria-label="close" type="button">닫기</button>';

    // 메인메뉴 카테고리
    var mainCategories = {
        "∥시작하기∥": ["1", "2"],
        "∥학습하기∥": ["3", "4"],
        "∥마무리하기∥": ["5", "6"],
    };

    $.each(mainCategories, function (category, pages) {
        mainMenuList += '<li class="main-item">';
        mainMenuList += '<h3 class="item-title">' + category + "</h3>";
        mainMenuList += '<ul class="sub-menu-list">';

        $.each(pages, function (index, key) {
            var value = config.page_type[key];
            var indexActive =
                parseInt(currentPage) === parseInt(key) ? "is-active" : "";
            var href = numToNDigitStr(key, 2) + ".html";

            mainMenuList +=
                '<li class="sub-item ' +
                indexActive +
                '">' +
                '<a href="' +
                href +
                '" class="item-link">' +
                value.title +
                "</a>" +
                "</li>";
        });

        mainMenuList += "</ul></li>";
    });

    mainMenuList += "</ul>";
    menuContentWrap.html(mainMenuList);
    $("#side-menu").append(menuCloseButton);

    $(".menu-close").on("click", closeNav);
}

function contentInit() {
    //set title
    document.title = config.title;

    var content_elemont = "";
    if (
        config.page_type[parseInt(currentPage)].content_extension === "mp3" ||
        config.page_type[parseInt(currentPage)].content_extension === "aac" ||
        config.page_type[parseInt(currentPage)].content_extension === ""
    ) {
        //audio (mp3, aac, 빈 확장자)
        //console.log('audio');
        content_elemont =
            '<audio id="player" class="video-js vjs-has-started" controls preload="auto" autoplay="autoplay" playsinline poster="" ></audio>';
        $(".video-wrap").prepend(content_elemont);
        options.inactivityTimeout = 0;
    } else {
        //video
        //console.log('video');
        content_elemont =
            '<video id="player" class="video-js vjs-has-started" controls preload="auto" autoplay="autoplay" playsinline poster="" ></video>';
        $(".video-wrap").prepend(content_elemont);
    }

    var player;
    if (player === undefined) {
        if (
            parseInt(currentChapter) === 1 &&
            parseInt(currentPage) === 1 &&
            config.competency_test
        ) {
            $("#player").attr("autoplay", false);
            $("#modal-competency-test").addClass("is-active");
        }

        videojs("player", options, function () {
            var obj = this;
            
            // AAC 파일 지원을 위한 MIME 타입 설정
            if (config.page_type[parseInt(currentPage)].content_extension === "aac") {
                obj.src({
                    src: contentUrl(),
                    type: 'audio/aac'
                });
            } else {
                obj.src({
                    src: contentUrl(),
                });
            }

            if (
                parseInt(currentChapter) === 1 &&
                parseInt(currentPage) === 1 &&
                config.competency_test
            ) {
                var observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        if (
                            !document
                                .querySelector("#modal-competency-test")
                                .classList.contains("is-active")
                        ) {
                            obj.play();
                        }
                    });
                });
                observer.observe(
                    document.querySelector("#modal-competency-test"),
                    {
                        attributes: true,
                        attributeFilter: ["class"],
                    }
                );

                obj.autoplay(false);
            } else {
                obj.autoplay(true);
            }

            obj.on("play", function () {
                $(".vjs-overlay").hide();

                if (parseInt(currentPage) === 1) {
                    if (
                        $(".vjs-play-control").attr("title", "Play") ||
                        $(".vjs-play-control").attr("title", "Pause")
                    ) {
                        $(".content-wrap").css("display", "none");
                    }
                }
            });
            obj.on("pause", function () {
                $(".vjs-overlay").show();
            });

            obj.on("loadedmetadata", function () {
                if (document.location.hash.split("#time=")[1] !== undefined) {
                    console.log("ready : " + obj.readyState());
                    obj.currentTime(document.location.hash.split("#time=")[1]);

                    //sile menu hide;
                }
            });

            window.addEventListener("hashchange", function () {
                if (document.location.hash.split("#time=")[1] !== undefined) {
                    obj.currentTime(document.location.hash.split("#time=")[1]);
                    //sile menu hide;
                }
            });

            obj.on("ended", function () {
                var playToggle = obj.controlBar.playToggle;

                // 첫 페이지인 경우 차시 제목 표시
                // if (parseInt(currentPage) === 1 ) {
                //     displayClassTitle();
                // }

                // page_type의 길이를 기준으로 마지막 페이지 체크
                var lastPage = Object.keys(config.page_type).length;
                if (parseInt(currentPage) !== lastPage) {
                    $(".vjs-control.vjs-button.btn-next").addClass("toolTip");
                } else {
                    $(".vjs-control.vjs-button.btn-next").addClass("last_page");
                }

                // 영상 종료 시 replay아이콘 -> play아이콘으로 변경
                playToggle.removeClass("vjs-ended");
                playToggle.addClass("vjs-paused");
            });

            // 키보드 이벤트
            obj.on("keydown", function (e) {
                switch (e.key) {
                    case " ": // Space 키
                        if (obj.paused()) {
                            obj.play();
                        } else {
                            obj.pause();
                        }
                        break;
                    case "ArrowRight": // 오른쪽 화살표 키
                        obj.currentTime(obj.currentTime() + 10); // 10초 앞으로
                        break;
                    case "ArrowLeft": // 왼쪽 화살표 키
                        obj.currentTime(obj.currentTime() - 10); // 10초 뒤로
                        break;
                    case "ArrowUp": // 위쪽 화살표 키
                        obj.volume(obj.volume() + 0.1); // 볼륨 증가
                        break;
                    case "ArrowDown": // 아래쪽 화살표 키
                        obj.volume(obj.volume() - 0.1); // 볼륨 감소
                        break;
                    case "Escape": //esc 키
                        $(".content-wrap").removeClass("type-full-screen");
                        break;
                    default:
                        break;
                }
            });
        });
    } else {
        player.src({
            src: contentUrl(),
        });
        player.load();
    }

    //contnet page number set
    $(".current-page-str").html(
        `<a href="javascript:goPrevPage();" class="current-num">${currentPage}</a><span> / </span><a href="javascript:goNextPage();" class="total-num">${numToNDigitStr(
            totalPage,
            2
        )}</a>`
    );

    fullScreenExit();
}

$(function () {
    contentInit();
    indexInit();
    runningMapInit();
    autoFocusProgress();

    // 역량진단 비활성화로 인한 모달/딤 상태 정리
    $(".modal").removeClass("is-active");
    $(".video-dim").hide();

    // 역량진단 자동 실행 제거
    /*
    if (
        config.competency_test &&
        parseInt(currentChapter) === 1 &&
        parseInt(currentPage) === 1
    ) {
        createCompetencyElements();
    }
    */
   
    if (config.page_type[parseInt(currentPage)].type === "opinion") {
        opinionElementInit();
    } else if (config.page_type[parseInt(currentPage)].type === "goal") {
        goalElementInit();
    } else if (config.page_type[parseInt(currentPage)].type === "quiz") {
        quizElementInit();
    } else if (config.page_type[parseInt(currentPage)].type === "summary") {
        summaryElementInit();
    } else {
        $(".content-wrap").empty();
        $(".content-wrap").hide();
    }

    if (!config.competency_test) {
        $("#index-btn-competency-test").hide();
    }
    /* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
    $(".video-dim").click(closeNav);

    // Functions
    function getAll(selector) {
        return Array.prototype.slice.call(
            document.querySelectorAll(selector),
            0
        );
    }

    // Modal
    var rootEl = document.documentElement;
    var $modals = getAll(".modal");
    var $modalButtons = getAll(".modal-button");
    var $modalCloses = getAll(
        ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    );

    if ($modalButtons.length > 0) {
        $modalButtons.forEach(function ($el) {
            $el.addEventListener("click", function () {
                var target = $el.dataset.target;
                openModal(target);
            });
        });
    }

    if ($modalCloses.length > 0) {
        $modalCloses.forEach(function ($el) {
            $el.addEventListener("click", function () {
                closeModals($el);
            });
        });
    }

    function openModal(target) {
        var $target = document.getElementById(target);
        //rootEl.classList.add("is-clipped");
        $target.classList.add("is-active");
    }

    function closeModals($el) {
        //rootEl.classList.remove("is-clipped");
        var $modal = $el.closest(".modal");
        if ($modal) {
            $modal.classList.remove("is-active");
        }
    }

    function autoFocusProgress() {
        setTimeout(function () {
            $(".vjs-progress-control").focus();
        }, 50);
    }
});
