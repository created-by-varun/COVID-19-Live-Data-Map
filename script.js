var countryData = "";
var activeCountry = "";
var timestamp = 0;
var mY = 0;

function getData() {
  $.ajax({
    url: 'https://coronavirus-19-api.herokuapp.com/countries',
    type: 'GET',
    success: function(response) {

      countryData = $(response);
      appendData();
    }
  });
}

getData();

function appendData(){
  for (var i = 0 ; i < countryData.length ; i++)    {
  $("#tooltip").append("<div data-name='"+countryData[i].country+"' class='data'><h3>"+countryData[i].country+"</h3><h4>Total Cases:<span> "+countryData[i].cases+"</span></h4><h4>Total Deaths:<span> "+countryData[i].deaths+"</span></h4><h4>Total Recoveries:<span> "+countryData[i].recovered+"</span></h4></div>");
 
  };
  $('#lower path').hover(function(){
    $('#tooltip').toggleClass('active');
    activeCountry = $(this).attr("data-name");
    $(this).toggleClass('active');
    $('.data').removeClass('active');
    $('.data[data-name="'+ activeCountry +'"]').addClass('active');
  })
  setTimeout(function(){
    $('body').addClass('loaded');
  }, 2000);
}



  var $self = $('#map'),
  $cursor = $("#tooltip"),
  $country = $("svg path"),
  $map = $("#map #lower");

  $country.mouseover(function(){
    gsap.to(this, {
      duration: 0.2,
      scale: 1.05, 
      transformOrigin: '50% 50%',
      overwrite: true
    });
  });
  $country.mouseout(function(){
    gsap.to(this, {
      duration: 0.2,
      scale: 1, 
      overwrite: true
    });
  });
  $self.mousemove(function(e) {
    gsap.to($map, {
      left: (e.pageX * -1),
      top: (e.pageY * -1) + 150,
      duration: 0.2,
      scale: 1, 
      overwrite: true
    });
    gsap.to($cursor, {
      left: e.pageX - 125,
      top: e.pageY - 175,
      duration: 0.2,
      overwrite: true
    });
  });
  $self.mouseout(function() {
      gsap.to($map, { 
        duration: 1, 
        left: '-50vw',
        top: '-25vh',
        overwrite: true
      });
  });