<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="Upgrades.aspx.cs" Inherits="Gateway.WebStore.Checkout.Upgrades" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Register Src="../App_Controls/Upgrades.ascx" TagName="Upgrades" TagPrefix="uc1" %>
<%@ Register Src="../App_Controls/UpdateProgressControl.ascx" TagName="UpdateProgressControl" TagPrefix="uc2" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
	<asp:ScriptManager ID="ScriptManager1" runat="server" />
	<asp:UpdatePanel ID="UpdatePanel" runat="server">
		<ContentTemplate>
			<uc1:Upgrades ID="UpgradesControl" runat="server" />
		</ContentTemplate>
	</asp:UpdatePanel>
	<uc2:UpdateProgressControl ID="UpdateProgressControl" runat="server" />

    <% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/upgrades.html") %>
</asp:Content>