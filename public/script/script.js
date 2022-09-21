$(".fa-circle-check").css("display", "none");

$("#newTodo").keypress(function(event) {
    if(event.which === 13) {
        var todo = $(this).val();
        if(todo.length === 0) return;
        // $(this).val("");
        
        
        var list = document.getElementsByTagName("li");
        for(let i=0; i<list.length; i++) {
            if (list[i].textContent.toLowerCase() === todo.toLowerCase())  {
                list[i].classList.toggle("flash");
                return;
            }
        }
        $("ul").append('<li>'+todo+'</i><i class="fa-solid fa-trash-can"></i></li>')
    }
})

$("#search").keyup(function(event) {
    var find = $(this).val().toLowerCase();
    var list = document.getElementsByTagName("li");
    for(let i=0; i<list.length; i++) {
        if (!list[i].textContent.toLowerCase().includes(find)) list[i].classList.add("filtred");
        else list[i].classList.remove("filtred");
    }
})

$("ul").on("click", ".fa-trash-can", function(event){
    $(this).parent().parent().fadeOut(300, function() {
        $(this).remove();
    })
    event.stopPropagation();
})


$("ul").on("click", "li", function(event) {
    $(this).toggleClass("check");
    $(this).find(".fa-trash-can").fadeToggle();
    event.stopPropagation();
})



$('#newTodo').focus();

