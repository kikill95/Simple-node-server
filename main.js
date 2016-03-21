$.ajax({
    url: 'data.json',
    type: 'GET'
})
  .done(function(data) {
      var lis = '';
      data.forEach(function(element) {
          lis += '<li>' + element.todo + '</li>'
      });
      document.getElementById('list').innerHTML = lis;
  });

document.getElementById('enter').addEventListener('keypress', function(event) {
    var list = document.getElementById('list');
    if (event.keyCode === 13) {
        list.innerHTML = list.innerHTML + '<li>' + event.target.value + '</li>';
        $.ajax({
            url: 'save',
            type: 'POST',
            data: {todo: event.target.value}
        })
          .done(function(msg) {
              console.log(msg);
          });
        event.target.value = '';
    }
});
