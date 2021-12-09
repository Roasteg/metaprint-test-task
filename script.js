let _form = [];
let _data = (file, modifier) => webix.ajax(file).then((data) => {
    _form = data.json()
    if (modifier) {
        return _form[modifier];
    } else {
        return _form
    }
})


let leftFormDatatableCols = [
    {id: "name", header: "Nimetus", adjust: "data"},
    {
        id: "normvalue", header: "Väärtus", width: 100,
        css: {
            "text-align": "center"
        }, template: function (obj) {
            return obj["normvalue"].replace(/\./g, ",")
        }
    },
    {id: "unit", header: "Ühik", adjust: "data"},
    {
        id: "minok", header: "MIN", width: 150, css: {
            "text-align": "center"
        }, template: function (obj) {
            if (obj["minok"] === null) {
                return "-"
            } else {
                return obj["minok"].replace(/\./g, ",")
            }
        }
    },
    {
        id: "maxok", header: "MAX", css: {
            "text-align": "center"
        }, width: 150, fillspace: true, template: function (obj) {
            if (obj["maxok"] === null) {
                return "-"
            } else {
                return obj["maxok"].replace(/\./g, ",")
            }
        }
    }
]

let rightFormDatatableCols = [
    {
        id: "tlm_nr",
        header: [{text: "Tellimuse Nr.", css: {"text-align": "center", "border-bottom": "0 !important"}}, ""],
        css: {"text-align": "center"},
        width: 150
    },
    {
        id: "jooks", header: [{text: "Jooks", css: {"text-align": "center", "border-bottom": "0 !important"}}, ""],
        css: {"text-align": "center"}
    },
    {
        id: "plekk",
        header: [{text: "Pleki kood", css: {"text-align": "center", "border-bottom": "0 !important"}}, ""],
        css: {"text-align": "center"},
        adjust: "data"
    },
    {
        id: "moot",
        header: [{text: "Mõõt", css: {"text-align": "center", "border-bottom": "0 !important"}}, ""],
        adjust: "data",
        css: {"text-align": "center"}
    },
    {
        id: "margEes",
        header: [{text: "Margiserv", css: {"text-align": "center"}, colspan: 2}, "EES"],
        css: {"text-align": "center"}
    },
    {id: "margTaga", header: ["", "TAGA"], width: 170, css: {"text-align": "center"}},
    {
        id: "lacqFreeEes",
        header: [{text: "Lakivaba tsoon", css: {"text-align": "center"}, colspan: 2}, "EES"],
        css: {"text-align": "center"},
        width: 170
    },
    {id: "lacqFreeTaga", header: ["", "TAGA"], css: {"text-align": "center"}, width: 170},
    {
        id: "kpv",
        header: [{text: "Kuupäev", css: {"text-align": "center", "border-bottom": "0 !important"}}, ""],
        adjust: "data",
        template: function (obj) {
            return obj['kpv'].replace(/\-/g, '.')
        }
    },
    {
        id: "time",
        header: [{text: "Kellaaeg", css: {"text-align": "center", "border-bottom": "0 !important"}}, ""],
        adjust: "data"
    }
]

let rightFormColsInput = [
    {view: "text", label: "Viskoossus", name: "viskoossus", labelPosition: "top"},
    {width: 10},
    {view: "text", label: "Laki temperatuur", name: "temp", labelPosition: "top"},
    {width: 10},
    {view: "text", label: "Märg kaal", name: "mkaal", labelPosition: "top"},
    {width: 10},
    {view: "text", label: "Kuiv kaal", name: "kkaal", labelPosition: "top"},
    {
        rows: [
            {},
            {
                view: "button",
                id: "submitForm",
                type: "icon",
                icon: "mdi mdi-plus",
                align: "center",
                width: 30,
                click: function () {
                    if (this.getFormView().validate()) {
                        this.getFormView().getValues()
                    } else {
                        webix.message("Please, fill the gaps")
                    }
                }
            }
        ]

    },

]

let rightFormTabViewCells = [
    {header: "Viimased mõõtmised"},
    {
        header: "Margiseva mõõtmised", body: {
            view: "datatable",
            data: _data("form_right.json"),
            columns: rightFormDatatableCols,
            height: 200,
            fillspace: true

        }
    },
    {header: "LAB mõõtmised(87 +/- 1)"},

]

let rightFormTabView = [
    {
        view: "tabview", cells: rightFormTabViewCells, padding: {
            top: 20
        }
    }
]

let dataFormElements = [
    {view: "text", name: "lakktype", readonly: true, label: "Laki tüüp", bottomPadding: 5, labelWidth: 120},

    {view: "text", name: "namelahusti", readonly: true, label: "Lahusti", bottomPadding: 25, labelWidth: 120},
    {
        view: "datatable",
        id: "table",
        data: _data("form_left.json", "params"),
        columns: leftFormDatatableCols,
        autoheight: true,
        fillspace: true,
        width: 600,
    }
]

let dataFormTabElements = [
    {
        rows: [
            {cols: rightFormColsInput},
            {cols: rightFormTabView}
        ]
    }
]


let mainCols = [
    {
        view: "form",
        id: "dataFormTable",
        elements: dataFormElements,
        data: _data("form_left.json"),
    },
    {width: 5},
    {
        view: "form", id: "dataFormTab", elements: dataFormTabElements, rules: {
            "viskoossus": webix.rules.isNotEmpty,
            "temp": webix.rules.isNotEmpty,
            "mkaal": webix.rules.isNotEmpty,
            "kkaal": webix.rules.isNotEmpty
        }
    }
]

let main = [
    {
        view: "accordion", multi: true,
        rows: [
            {
                header: "lakk 28S61MA Valspari kuld tootmisinfo ja mõõtmised",
                body: {
                    cols: mainCols,
                }
            }
        ]
    }
]

webix.ready(function () {
        webix.ui({
            container: "container",
            cols: main,
        })
    }
)

