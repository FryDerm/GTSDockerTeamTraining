<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Checkout.TermsAndConditions" Title="Untitled Page" Codebehind="TermsAndConditions.aspx.cs" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
	<cc1:HtmlContent ID="TermsAndConditionsHtmlContent" Kind="TermsAndConditions" runat="server" /><br />
	<asp:Button ID="ContinueButton" runat="server" OnClick="ContinueButton_OnClick" />
</asp:Content>