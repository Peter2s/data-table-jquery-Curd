$(document).ready(function(){
    getDate();
    //delete button
    $("table").on("click",".deleteBtn",function(e){
        $.confirm({
            title: 'Confirm!',
            content: 'Do you wont delete Row !',
            buttons: {
                confirm: function () {
                   deleteRow(getId(e.target))
                },
                cancel: function () {
                }
            }
        });
    })

    // save button
    $("table").on("click",".saveBtn",function(e){
        let id = getId(e.target);
        let data = $(e.target).parent().parent().children();
        let dataObject =  {
            id:getId(e.target),
            "name":$(($(data[1]).children())[0]).val() ,
            "age":$(($(data[2]).children())[0]).val() ,
            "salary":$(($(data[3]).children())[0]).val() 
        }
        $("input").trigger("blur");
        delete err["id"];
        if($.isEmptyObject(err)){
            $("#err").html("");
            $.ajax({
                url:`http://localhost:3000/employees/${id}`,
                method:"PUT",
                data:dataObject,
                success:function(res){
                    console.log(res)
                },
                error:function(err){
                    console.log(err)
                }
            })
        }else{
            showErrorMsg(err);
        }
    })
 
    //inti err object
     err ={}
    $("table").on('blur',"input",function(e){
        Validate(e.target,err);
        showErrorMsg(err);
    })//end on blur

    // Add button
    $("#addBtn").on("click",function(e){
        e.preventDefault();
        $("input") .trigger("blur")
        if($.isEmptyObject(err)){
            let data = {
                "id":$("input[name='id']").val(),
                "name":$("input[name='name']").val(),
                "age":$("input[name='age']").val(),
                "salary":$("input[name='salary']").val()
            }
            addEmp(data);
        }else{
            showErrorMsg(err)
        }
    }) // end add button

    $("table").on("click",".editBtn",function(e){
        editRow(e);
    })
})//end load