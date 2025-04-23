var RESTResponseMgr = require("dw/system/RESTResponseMgr");

exports.getLoyaltyInfo = function () {

 var customerId = request
 .getHttpParameterMap()
 .get("c_customer_id")
 .getStringValue();

 /*
 ... some lookup of loyalty data based on customer id ...
 */

 if (customerId === "customer1") {

 var info = {
 tier: "silver",
 points: 14275
 };

 RESTResponseMgr
 .createSuccess(info)
 .render();

 } else {

 RESTResponseMgr
 .createError(404, "customer-not-found", "Customer Unknown", "You provided an unknown customer ID.")
 .render();

 }
};

exports.getLoyaltyInfo.public = true;