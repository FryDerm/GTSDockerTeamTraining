<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="AddOns.aspx.cs" Inherits="Gateway.WebStore.Checkout.AddOns" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Register Src="../App_Controls/AddOns.ascx" TagName="AddOns" TagPrefix="uc1" %>
<%@ Register Src="../App_Controls/UpdateProgressControl.ascx" TagName="UpdateProgressControl" TagPrefix="uc2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
	<asp:ScriptManager ID="ScriptManager1" runat="server" />
	<asp:UpdatePanel ID="UpdatePanel" runat="server">
		<ContentTemplate>
			<uc1:AddOns ID="AddOnsControl" runat="server" />
		</ContentTemplate>
	</asp:UpdatePanel>
	<uc2:UpdateProgressControl ID="UpdateProgressControl" runat="server" />

    <% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/addOns.html") %>

</asp:Content>