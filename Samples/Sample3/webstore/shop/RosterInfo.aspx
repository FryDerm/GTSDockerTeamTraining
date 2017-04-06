<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="RosterInfo.aspx.cs" Inherits="Gateway.WebStore.shop.RosterInfo" EnableEventValidation="false" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Register Src="../App_Controls/RosterControl.ascx" TagName="RosterControl"	TagPrefix="uc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
	<asp:ScriptManager ID="ScriptManager1" runat="server" />
	<uc1:RosterControl ID="RosterControl" runat="server" 
		OnDirectEditRedirUrlEvent="DirectEditRedirUrl"
		OnCancelDirectEditRedirUrlEvent="CancelDirectEditRedirUrl"   
		OnAutoEditRedirUrlEvent="AutoEditRedirUrl"
		OnCancelAutoEditRedirUrlEvent="CancelAutoEditRedirUrl"
		OnContactInfoAlreadyUsedEvent="ContactInfoAlreadyUsed"
		OnRosterAddressWarningEvent="RosterAddressWarningEvent" />
	
	<% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/roster.html") %>
</asp:Content>