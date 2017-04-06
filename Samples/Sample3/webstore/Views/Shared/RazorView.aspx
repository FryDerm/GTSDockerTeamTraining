<%@ Page Title="[L:Title]" Language="C#" MasterPageFile="~/MasterPage.master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
	<% Html.RenderAction("Index", "AppTheme"); %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
	<% Html.RenderPartial((string) ViewBag._ViewName); %>
</asp:Content>