<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="RequestCorporateAccount.aspx.cs" Inherits="Gateway.WebStore.Account.RequestCorporateAccount" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<%@ Register Src="../App_Controls/RequestCorporateAccountForm.ascx" TagName="RequestCorporateAccountForm" TagPrefix="uc1" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>

<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">

    <div data-replace="requestCorporateAccount">

        <br />
        <asp:PlaceHolder ID="RequestCorporateAccountPlaceHolder" runat="server">
            <uc1:RequestCorporateAccountForm ID="RequestCorporateAccountForm" runat="server" />
        </asp:PlaceHolder>

		    <span data-el="continueButton"><asp:Button ID="ContinueButton" runat="server" OnClick="ContinueButton_Click" /></span>
		    <br />

    </div>

    <% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/requestCorporateAccount.html") %>

</asp:Content>