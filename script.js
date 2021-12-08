let _form = [];
let data_ = (file, modifier) => webix.ajax(file).then((data) => {
    _form = data.json()
    if (modifier) {
        return _form[modifier];
    } else {
        return _form
    }
})

let leftFormDatatableCols = [
    {id: "name", header: "Nimetus", adjust: "data"},
    {id: "normvalue", header: "Väärtus", width: 100,
        css:{
            "text-align":"center"
        }},
    {id: "unit", header: "Ühik", adjust: "data"},
    {id: "minok", header: "MIN", width: 150, css:{
            "text-align":"center"
        }, template: function(obj){
        if(obj["minok"] === null){
            return "-"
        }
        else{
            return obj["minok"]
        }
        }},
    {id: "maxok", header: "MAX", css:{
            "text-align":"center"
        }, width: 150,template: function(obj){
            if(obj["maxok"] === null){
                return "-"
            }
            else{
                return obj["maxok"]
            }
        }}
]

let rightFormDatatableCols = [
    {id: "tlm_nr", header: "Tellimuse Nr", width: 150,css:{
            "text-align":"center"
        }},
    {id: "jooks", header: "Jooks", css: {"text-align":"center"}},
    {id: "plekk", header: "Pleki kood", adjust: "data", css: {"text-align":"center"}},
    {id: "moot", header: "Mõõt", adjust: "data", css: {"text-align":"center"}},
    {id: "margEes", header: [{text: "Margiserv", css: {"text-align":"center"}, colspan: 2}, "EES"], css: {"text-align":"center"}},
    {id: "margTaga", header: ["", "TAGA"], width: 170, css: {"text-align":"center"},},
    {id: "lacqFreeEes", header: [{text: "Lakivaba tsoon", css: {"text-align":"center"}, colspan: 2},"EES"],css: {"text-align":"center"}, width: 170},
    {id: "lacqFreeTaga", header: ["", "TAGA"], css: {"text-align":"center"}, width:170},
    {id: "kpv", header: "Kuupäev", adjust: "data", template: function (obj){
        return obj['kpv'].replace(/\-/g, '.')
        }},
    {id: "time", header: "Kellaaeg", adjust: "data"}
]

let rightFormColsInput = [
    {view: "text", label: "Viskoossus", validate: webix.rules.isNotEmpty(), labelPosition: "top"},
    {view: "text", label: "Laki temperatuur", labelPosition: "top"},
    {view: "text", label: "Märg kaal", labelPosition: "top"},
    {view: "text", label: "Kuiv kaal", labelPosition: "top"},
    {view: "button", autowidth: true, autoheight: true, value: "+"},

]

let rightFormTabViewCells = [
    {header: "Viimased mõõtmised"},
    {
        header: "Margiseva mõõtmised", body: {
            view: "datatable", data: data_("grid.json"), columns: rightFormDatatableCols, height: 200, fillspace: true

        }
    },
    {header: "LAB mõõtmised(87 +/- 1)"},

]

let rightFormTabView = [
    {view: "tabview", cells: rightFormTabViewCells, padding:{
        top: 20
        }}
]

let dataFormElements = [
    {view: "text", name: "lakktype", readonly: true, label: "Laki tüüp", bottomPadding: 5, labelWidth: 120},

    {view: "text", name: "namelahusti", readonly: true, label: "Lahusti", bottomPadding: 25, labelWidth: 120},
    {
        view: "datatable",
        id: "table",
        data: data_("form.json", "params"),
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
        data: data_("form.json"),
    },
    {width: 5},
    {
        view: "form", id: "dataFormTab", elements: dataFormTabElements
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


