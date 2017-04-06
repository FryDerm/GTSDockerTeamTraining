<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OrdellPayPalTest.aspx.cs" Inherits="Gateway.WebStore.checkout.OrdellPayPalTest" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <p>
        <asp:Button ID="ApproveButton" runat="server" OnClick="ApproveButton_OnClick" Text="Approve Payment" />
        </p>
        <p></p>
        <p>
        <asp:Button ID="CancelButton1" runat="server" OnClick="CancelButton_OnClick" Text="Cancel Payment" />
        </p>
    </div>
    </form>
</body>
</html>
