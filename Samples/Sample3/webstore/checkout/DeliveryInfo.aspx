<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Checkout.DeliveryInfo" Title="Untitled Page" Codebehind="DeliveryInfo.aspx.cs" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
	<div id="DeliveryInfo">
		<cc1:HtmlContent ID="ReviewOrderHtmlContent" Kind="DeliveryInfo" runat="server" />
		<table cellspacing="0" cellpadding="0" width="100%" border="0" align="center">
			<tr>
				<td>
					<asp:Literal ID="UserSelectMessageLiteral" runat="server" />
					<table width="100%" border="0" cellspacing="2" cellpadding="2">
						<tr>
							<td style="width:100%">
								<asp:GridView
									ID="DeliveryGridView"
									Width="100%" CssClass="DeliveryInfoTable"							
									AutoGenerateColumns="false" 
									DataKeyNames="Id"
									AutoGenerateSelectButton="false" 
									GridLines="None"							
									OnRowDataBound="DeliveryGridView_RowDataBound"
									runat="server">
									
									<Columns>
										<asp:TemplateField  HeaderStyle-CssClass="NameHeaderColumn" ItemStyle-CssClass="NameColumn">
											<HeaderTemplate>
												<asp:Literal ID="NameHeaderLiteral" runat="server" />
											</HeaderTemplate>
											<ItemTemplate>
												<asp:Literal ID="RadioButtonLiteral" runat="server" />
												<asp:Literal ID="NameLiteral" runat="server" />
											</ItemTemplate>
										</asp:TemplateField>
										<asp:TemplateField HeaderStyle-CssClass= "DescriptionHeaderColumn" ItemStyle-CssClass="DescriptionColumn">
											<HeaderTemplate>
												<asp:Literal ID="DescriptionHeaderLiteral" runat="server" />
											 </HeaderTemplate>
											<ItemTemplate>
												<asp:Literal id="DescriptionLiteral" runat="server" />
												<br />
												<asp:LinkButton ID="MoreInfoLinkButton" runat="server" Visible="false" />
											</ItemTemplate>
										</asp:TemplateField>
										<asp:TemplateField HeaderStyle-CssClass="ShipDateHeaderColumn" ItemStyle-CssClass="ShipDateColumn">
											<HeaderTemplate>
												<asp:Literal ID="ShipDateHeaderLiteral" runat="server" />
											 </HeaderTemplate>
											<ItemTemplate>
												<asp:Literal id="ShipDateLiteral" runat="server" />
											</ItemTemplate>
										</asp:TemplateField>
										<asp:TemplateField HeaderStyle-CssClass="FeeHeaderColumn" ItemStyle-CssClass = "FeeColumn" >
											<HeaderTemplate>
												<asp:Literal ID="FeeHeaderLiteral" runat="server" />
											 </HeaderTemplate>
											<ItemTemplate>
												<asp:Literal id="FeeLiteral" runat="server" />
											</ItemTemplate>
										</asp:TemplateField>
									</Columns>
								</asp:GridView>
							</td>
						</tr>
						<tr>
							<td><asp:Button ID="ContinueButton" runat="server" OnClick="ContinueButton_OnClick" /></td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</div>
</asp:Content>