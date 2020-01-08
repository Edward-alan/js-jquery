define([], function() {
    return dialog;

})


var dialog = {
    dialogServerModify: function(data) {
        var div = document.createElement("div");
        div.className = "dialog";
        div.innerHTML = data.html;
        var btnParent = div.querySelector(".btn-parent");
        data.btn.forEach(function(item, index) {
            btnParent.innerHTML += `<button>${item.titleName}</button>`;
            setTimeout(function() {
                [...btnParent.children][index].onclick = function() {
                    item.method && item.method();
                }
            }, 0);
        });
        document.body.appendChild(div)
    },
}