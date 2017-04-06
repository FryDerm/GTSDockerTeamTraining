<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" EnableViewState="true"  AutoEventWireup="true" Inherits="Gateway.WebStore.Error" Title="Untitled Page" Codebehind="Error.aspx.cs" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
	<div data-replace="error">
		<asp:Label ID="ErrorLiteral" runat="server" data-text="errorLabel"/><br />
		<div id="errorMessage" data-html="errorHtml">
			<cc1:HtmlContent id="ErrorHtmlContent" Kind="Error" runat="server" />
		</div>
	</div>
	
	<% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/error.html") %>
</asp:Content>