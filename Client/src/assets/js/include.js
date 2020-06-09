

// modal + Tabs /////////////////////////////////////////////////////////////////
$(window).load(function(){
    // $('a.taux').on('click', function(){
    // if($(".wrap2").hasClass("active") && $("i.outils").hasClass("active")) {
    // $(".wrap2, i.outils, .tab-pane").removeClass("active");
    // }
    // $('.wrap, i.taux').toggleClass('active');
    // return false;
    // });
    
    
    // $('a.outils').on('click', function(){
    // if($(".wrap").hasClass("active") && $("i.taux").hasClass("active")) {
    // $(".wrap, i.taux, .tab-pane").removeClass("active");
    // }
    
    // $('.wrap2, i.outils').toggleClass('active');
    
    // if($(".wrap2").hasClass("active"))
    // $(".nav-link-offres").first().trigger("click");
    // else {
    // $(".tab-pane").removeClass("active");
    // }
    
    // return false;
    // });
    
    $(".nav-link-offres").click(function() {
    var id = $(this).attr("data-target");
    $(".tab-pane").removeClass("active");
    $("#" + id).addClass("active");
    });
    });
    
    
    //close button
    $(".close").click(function(){
    if($(".wrap2").hasClass("active") && $("i.outils").hasClass("active")) {
    $(".wrap2, i.outils, .tab-pane").removeClass("active");
    }
    if($(".wrap").hasClass("active") && $("i.taux").hasClass("active")) {
    $(".wrap, i.taux, .tab-pane").removeClass("active");
    }
    })
    
    
    // show on scroll /////////////////////////////////////////////////////////////////
    window.sr = ScrollReveal({ 
    delay: 300,
    mobile: false,
    });
    sr.reveal('.partners');
    sr.reveal('.filter');
    sr.reveal('.title');
    sr.reveal('.post');  
    sr.reveal('.footer'); 
    sr.reveal('.more-info'); 
    sr.reveal('section');
    
    