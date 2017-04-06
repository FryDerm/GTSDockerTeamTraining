var modalPopupID;

//  register for our events
Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(beginRequest);
Sys.WebForms.PageRequestManager.getInstance().add_endRequest(endRequest);    

function beginRequest(sender, args){
    // show the popup
    $find(modalPopupID).show();        
}

function endRequest(sender, args) {
    //  hide the popup
    $find(modalPopupID).hide();
} 