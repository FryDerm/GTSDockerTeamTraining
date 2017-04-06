<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Account.CreateAccount" Codebehind="CreateAccount.aspx.cs" %>
<%@ Register Src="../App_Controls/CreateAccount.ascx" TagName="CreateAccount" TagPrefix="uc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>

<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" />
    <div id="CreateAccountInfo">
		<uc1:CreateAccount
			ID="CreateAccountControl"
			runat="server"
			OnAccountCreated="CreateAccountControl_AccountCreated"
			OnAccountCreationFailed="CreateAccountControl_AccountCreationFailed" />
    </div>
</asp:Content>