<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Shop.PassLookup" Title="Untitled Page" Codebehind="PassLookup.aspx.cs" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Register Src="../App_Controls/PassLookupControl.ascx" TagName="PassLookupControl" TagPrefix="uc1" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
	<div id="PassLookup" data-replace="PassLookup">
        
        <div data-replace="PassLookup" data-parser="wshtml">
		    <cc1:HtmlContent id="HeaderHtmlContent" Kind="PassLookup" runat="server" />
        </div>

        <asp:ScriptManager ID="ScriptManager1" runat="server" />
		<uc1:PassLookupControl 
			ID="PassLookupControl"
			runat="server"
			OnPassLookupSucceeded="PassLookupControl_PassLookupSucceeded"
			OnPassLookupFailed="PassLookupControl_PassLookupFailed" />
	</div>
	<% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/passLookup.html") %>
</asp:Content>