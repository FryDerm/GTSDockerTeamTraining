<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="ViewPassRenewals.aspx.cs" Inherits="Gateway.WebStore.Shop.ViewPassRenewals" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Register Src="../App_Controls/SalesChannelDetailControl.ascx" TagName="SalesChannelDetailControl" TagPrefix="uc1" %>
<%@ Register Src="../App_Controls/CartSmall.ascx" TagName="CartSmall" TagPrefix="uc2" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>

<asp:Content ID="PassRenewalContent" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
	<div id="ViewPassRenewals" data-replace="ViewPassRenewals">
		<cc1:HtmlContent ID="ReviewOrderHtmlContent" Kind="ViewItems" runat="server" />
		<asp:ScriptManager ID="ScriptManager1" runat="server" />
		<asp:UpdatePanel ID="UpdatePanel" runat="server">
			<ContentTemplate>
					<div id="ErrorLabelArea">
						<asp:Literal ID="ViewItemsErrorLabel" runat="server" />
					</div>
					<div id="ViewItems">
						<table width="100%">
							<tr>
								<td>
									<uc1:SalesChannelDetailControl
										ID="SalesChannelDetailControl"
										runat="server"
										PresenterOption="MutualExclusive"
										OnErrorNotification="SalesChannelDetailControl_ErrorNotification"
										OnItemsAdded="SalesChannelDetailControl_ItemsAdded" />
								</td>
								<td valign="top">
									<uc2:CartSmall ID="CartSmall" runat="server" />
								</td>
							</tr>
						</table>
					</div>
				</ContentTemplate>
		</asp:UpdatePanel>
		<asp:UpdateProgress ID="UpdateProgress" runat="server" DisplayAfter="300" DynamicLayout="False" >
		<ProgressTemplate>
			<div class="updateProgressImage">
				<asp:Image ID="UpdateProgressImage" runat="server" ImageUrl="~/images/GTS/ajax-loading.gif" />
				<br /> <asp:Label ID="UpdateProgressLabel" Text="Updating ....." runat="server"/>
			</div>
			<div class="updateprogress">         
			</div>
		</ProgressTemplate>
	  </asp:UpdateProgress>
  </div>
    <% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/viewPassRenewals.html") %>
</asp:Content>