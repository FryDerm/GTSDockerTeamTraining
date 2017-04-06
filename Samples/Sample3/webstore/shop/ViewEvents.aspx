<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="ViewEvents.aspx.cs" Inherits="Gateway.WebStore.Shop.ViewEvents" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Register src="../App_Controls/EventsDateTimeSelector.ascx" tagname="EventsDateTimeSelector" tagprefix="uc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
	<div id="ViewEvents" data-replace="viewEventsCalendar">
		<div data-html="calendarHtml">
			<uc1:EventsDateTimeSelector ID="EventsDateTimeSelector" ReadOnly="true" runat="server" /> 
		</div>
	</div>
	<% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/viewEvents.html") %>
</asp:Content>