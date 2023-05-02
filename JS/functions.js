function getDate(){
    $.ajax({
        url:"http://localhost:3000/employees",
        success:function(res){
            for(let item of res){
                createTr(item);
            }
            console.log(res)
        },
        error:function(err){
            console.log(err)
        }
    })
}

function createTr(res){
    let newTr = document.createElement("tr");
    let newTd ;
    for(let prop in res){
        newTd= document.createElement("td");
        $(newTd).text(res[prop]).appendTo(newTr)
    }
    //create buttons
    let actionTd= document.createElement("td");
    let editButn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    $(editButn).text("Edit").addClass("editBtn").appendTo(actionTd);
    $(deleteBtn).text("Delete").addClass("deleteBtn").appendTo(actionTd);
    $(actionTd).appendTo(newTr);
    $(newTr).appendTo("#data");
}

function deleteRow(id){
    $.ajax({
        url:`http://localhost:3000/employees/${id}`,
        method:"DELETE",
        success:function(res){
            console.log(res);
        },
        error:function(err){
            console.log("err",err)
        }
    })
}

function addEmp(emp){
    $.ajax({
        url:"http://localhost:3000/employees",
        method:"POST",
        data:emp,
        success:function(res){
            console.log(res);
        },
        error:function(err){
            console.log(err);
        }
    })

}
function editRow(e){
    let cells = $(e.target).parent().parent().children();
    for(let i = 1 ;i<cells.length-1;i++){
        let input = document.createElement("input");
        $(input).val( $(cells[i]).text() )
        switch(i){
            case 1:
                $(input).attr("name","name");
            break;
            case 2 :
                $(input).attr("name","age");
            break;
            case 3 :
                $(input).attr("name","salary");
            break;
        }
        $(cells[i]).text("").append(input)
    }
    let saveBtn = document.createElement("button")
    $(saveBtn).addClass("saveBtn").text("Save");
    $(cells[cells.length-1]).html(saveBtn)
    
}
function getId(item){
    return $($(item).parent().parent().children()[0]).text();
}
function Validate(elment,err){
    let elmentName  = $(elment).attr("name");
    if( isEmpty($(elment).val()) )
        err[elmentName] = `${elmentName} can't be empty`;
    else
    delete  err[elmentName] ;

    if ( isNumber($(elment).val()))
        if(elmentName != "name")
            err[elmentName] = `${elmentName} must be number`
  

    if (validateAge($(elment).val()) == false)
        if(elmentName == "age")
            err[elmentName] = `${elmentName} must be btween 20 an 60`

   
}

function isEmpty(val){
    if(val.trim() == "") return true; else return false;
}
function isNumber(val){
    if( isNaN( Number(val))) return true;
    else false;
}
function validateAge(val){
    if( Number( val) < 20)
    return false;

    if( Number(val) > 60)
    return false;

    return true;
}
function showErrorMsg(err){
    $("#err").html("");
    let FLAG = true;
        for(let prop in err){
            let errDiv = document.createElement("div");
            $(errDiv).text(`${err[prop]}`)
            $("#err").append(errDiv);
        }
    

}