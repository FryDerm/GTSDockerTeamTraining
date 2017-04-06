<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="RequestCorporateAccountConfirmation.aspx.cs" Inherits="Gateway.WebStore.account.RequestCorporateAccountConfirmation" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>

<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server" data-replace="requestCorporateAccountConfirmation">
    <br />
    <div id="RequestCorporateAccountConfirmation">
        <asp:Literal ID="ConfirmationLiteral" runat="server" />
    </div>

    
    <% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/requestCorporateAccountConfirmation.html") %>

</asp:Content>