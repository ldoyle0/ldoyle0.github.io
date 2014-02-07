$(function() {
    
    Parse.$ = jQuery;
    
    Parse.initialize("rCTZSzWEnOtjaCDiQ8zqyYZWPgXOatYb3ynhK8nT", "rCTZSzWEnOtjaCDiQ8zqyYZWPgXOatYb3ynhK8nT");
    
    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
      testObject.save({foo: "bar"}, {
      success: function(object) {
        $(".success").show();
      },
      error: function(model, error) {
        $(".error").show();
      }
    });
    
    var errorButton =  Parse.Object.extend("input");
    var myErrorButton = new errorButton();
    
    myErrorButton.set("type","errorButton");
    myErrorButton.set("action","showError");
    
    
});