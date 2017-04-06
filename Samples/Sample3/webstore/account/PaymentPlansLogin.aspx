<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Account.PaymentPlansLogin" Title="Untitled Page" Codebehind="PaymentPlansLogin.aspx.cs" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<%@ Register src="../App_Controls/Login.ascx" tagname="Login" tagprefix="uc1" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
	<div id="PaymentPlansLogin">
		<cc1:htmlcontent id="HeaderHtmlContent" Kind="PaymentPlansLogin" runat="server" />
		<uc1:Login
			ID="LoginControl"
			runat="server"
			AuthenticateType="eGalaxy"
			OnAuthenticated="LoginControl_Authenticated"
			OnAuthenticationFailed="LoginControl_AuthenticationFailed" />
	</div>
	
	<% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/paymentPlanLogin.html") %>
</asp:Content>