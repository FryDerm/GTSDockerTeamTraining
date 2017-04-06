<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" EnableViewState="false"  AutoEventWireup="true" Inherits="Gateway.WebStore.PaymentRecordsError" Title="PaymentRecordsError Page" Codebehind="PaymentRecordsError.aspx.cs" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
	<div data-replace="paymentRecordsError">
	    <div id="errorMessage">
           <h5><asp:Literal ID="PaymentRecordsErrorLiteral" runat="server" /></h5>

        </div>
     </div>
    <% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/paymentRecordsError.html") %>
</asp:Content>