"use strict";

var path = "http://localhost:3001/";

casper.test.begin("WAF Test", 3, function suite(test) {
  casper.start();

  casper.thenOpen(
    path + "user?user=" + '<script>alert("Alert XSS")</script>',
    function () {
      test.assertEquals(
        this.evaluate(function () {
          return $("#search h3").text();
        }),
        "",
        "Reflected XSS : XSS Using Script Tag Injection Detected"
      );
    }
  );

  casper.thenOpen(
    path + "user?user=" + "<IMG SRC=\"javascript:alert('XSS');\">",
    function () {
      test.assertEquals(
        this.evaluate(function () {
          return $("#search h3").text();
        }),
        "",
        "Reflected XSS : Image XSS using the JavaScript directive"
      );
    }
  );

  casper.thenOpen(path + "dashboard", function () {
    this.evaluate(function () {
      $("input#inputUserName").val('<script>alert("Alert XSS")</script>');
      $("input#inputUserEmail").val("xyz@gmail.com");
      $("input#inputUserFullname").val("xyz");
      $("input#inputUserAge").val("60");
      $("input#inputUserLocation").val("abc");
      $("input#inputUserGender").val("male");
      $("#btnAddUser").trigger("click");
    });
    this.wait(5000, function () {
      test.assertEquals(
        this.evaluate(function () {
          return $(".name").text();
        }),
        "",
        "Persistent XSS : XSS Using Script Tag Injection In Post Body Detected"
      );
    });
  });

  casper.run(function () {
    test.done();
  });
});
