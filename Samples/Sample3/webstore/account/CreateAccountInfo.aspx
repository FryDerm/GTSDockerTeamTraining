<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Account.CreateAccountInfo" Codebehind="CreateAccountInfo.aspx.cs" %>
<%@ Register Src="../App_Controls/AccountForm.ascx" TagName="AccountForm" TagPrefix="uc2" %>
<%@ Register Src="../App_Controls/CustContactsForm.ascx" TagName="CustContactsForm"	TagPrefix="uc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>

<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="server">
    <div id="CreateAccountInfo">
	    <uc2:AccountForm ID="AccountForm" runat="server" />
        <br />
            
        <uc1:CustContactsForm ID="CustContactsForm" runat="server" />
        <asp:Button ID="ContinueButton" runat="server"  OnClick="ContinueButton_Click" />
    </div>
</asp:Content>