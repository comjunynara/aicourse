var config = {
    title: "[업무 능력 향상을 위한 생성형 AI 활용 A to Z]",
    menu_study_sub_index: false, //menu study sub-index
    content_path: "../content/",
    empty_path: "../content/common",
    competency_test: true, // 역량진단 사용여부 : 사용할경우 true, 사용하지 않을경우 false
    competency_test_path: "../CompetencyTest/index.html", // 역량진단 경로
    cookie_expire: 1, //cookie expire day
    summary_path: "../document/summary/",
    learning_resources: false, // 보충심화학습자료 사용여부
    learning_resources_path: "../document/learning_resources/",
    learning_resources_list: [{
        title: "보충심화학습자료",
        file_name: "supplementary_learning.pdf"
    }], // 보충심화학습자료 리스트
    extra_resources: false,
    extra_resources_path: "../document/extra/",
    learning_extra_list: [{
        title: "추가자료",
        file_name: "supplementary_learning.pdf"
    }], //추가 자료
    script_resources: true, // 강의교안 사용여부
    script_path: "../document/script/", //강의 교안
    script_zip: ['08', '18'], // zip 파일 차시
    sound: {  // 사운드 파일 경로 추가
        correct: "../common/sound/o.mp3",
        incorrect: "../common/sound/x.mp3"
    },
    page_type: {
        "1": {
            title: "인트로",
            type: "",
            content_extension: "mp4"
        },
        "2": {
            title: "학습 목표",
            type: "",
            content_extension: "mp4"
        },
        "3": {
            title: "강의 영상",
            type: "study",
            content_extension: "mp4"
        },
        "4": {
            title: "확인 퀴즈",
            type: "quiz",
            content_extension: "AAC"
        },
        "5": {
            title: "정리하기",
            type: "", // text 학습정리 일 경우 : "summary", video 학습정리 일 경우 : "" 빈칸
            content_extension: "mp4"
        },
        "6": {
            title: "아웃트로",
            type: "",
            content_extension: "mp4"
        }
    
    }

};
