<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="PassRenewalPLUControl.ascx.cs" Inherits="Gateway.Web.UI.Controls.PassRenewalPLUControl" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<div id="PLUListView" data-object-key='sub-category'>
	<asp:Panel ID="PLUPanel" runat="server">
		<asp:Repeater ID="PLURepeater" runat="server" OnItemDataBound="PassRenewalPLURepeater_ItemDataBound">
			<HeaderTemplate>
				<table width="100%">
					<tr><td colspan="2"><span class="ParentSCDName" data-html='parentSCDName'><asp:Literal ID="ParentSCDNameLiteral" runat="server" /></span></td></tr>
					<tr><td colspan="2"><span class="ParentSCDDescription" data-text='parentSCDDescription'><asp:Literal ID="ParentSCDDescriptionLiteral" runat="server" /></span></td></tr>
					<tr>
						<td><span class="ParentSCDImage" data-el='parentSCDImage'><asp:Image ID="ParentSCDImage" runat="server" /></span></td>
						<td>
							<table width="100%">
								<tr>
									<td colspan="4" data-el='moreInfoLink'><asp:LinkButton ID="CompleteDetailsLinkButton" runat="server" Text="Complete Details" OnClientClick="ItemDetailPopUp.aspx?{0}={1}" Visible="false" /></td>
								</tr>
								<tr>
									<td colspan="4" class="text-right">
									    <asp:PlaceHolder ID="SelectionControlPlaceHolder" runat="server">
									        
									    </asp:PlaceHolder>
										<span class="ItemEventHeader">
											<span class="ItemEventText"><asp:Literal ID="EventDateTimeTextLiteral" runat="server" Visible="false" /></span>
											<span class="ItemEventDateTime"><asp:Literal ID="EventDateTimeValueLiteral" runat="Server" Visible="false" /></span>
										</span>
									</td>
								</tr>
			</HeaderTemplate>
			<ItemTemplate>
					<asp:PlaceHolder ID="EventDatePlaceHolder" runat="server" Visible="false">
						<tr>
							<td colspan="4" class="text-right">
								<asp:Literal ID="DateLiteral" runat="server" />&nbsp;<asp:TextBox ID="EventTicketDateTime" Columns="10" MaxLength="10" runat="server" />	
							</td>
						</tr>
					</asp:PlaceHolder>
					<tr data-object-key="items">
						<td><span class="PLUImage" data-el="plu-image"><asp:Image ID="PLUImage" runat="server" /></span></td>
						<td>
							<asp:HiddenField ID="SCDID" runat="server" />
							<asp:PlaceHolder ID="PLUControlsPlaceHolder" runat="server">
									<div class="PLUSelectedDate" style="float: right; text-align: right;"><asp:Label ID="PLUSelectedDateLabel" runat="server" Visible="false" CssClass="PLUSelectedDateLabel" /><br /></div>
									<span class="PLUName" data-html="pluInput"><asp:RadioButton ID="PLUSelectionRadioButton" runat="server" GroupName="PLURadioButtons" AutoPostBack="true" OnCheckedChanged="PLUSelectionCheckedChanged" /></span>
									<span class="PLUShortName" data-html="pluShortName"><asp:Literal ID="PLUShortNameLiteral" runat="server" /></span>
									<br />
									<span class="PLUDescription" data-html="plu-desc"><asp:Literal ID="PLUDescription" runat="server" /></span>
									<span data-html="payment-plan-desc"><asp:Panel ID="PaymentPlanPanel" runat="server" /></span>
							</asp:PlaceHolder>
							<asp:PlaceHolder ID="PackageDetailsControlPlaceHolder" runat="server" />
						</td>
						<td class="ViewItemsPriceColumn text-right"><span class="PLUPrice" data-text="price"><asp:Literal ID="PLUPriceLiteral" runat="server" /></span></td>
						<td>&nbsp;</td>
					</tr>
			</ItemTemplate>
			<FooterTemplate>
								</table>
							</td>
						</tr>
					</table>
			</FooterTemplate>
		</asp:Repeater>
		<asp:Panel ID="PassRenewalItemsPanel" runat="server">
		
		</asp:Panel>
		<%--<div align="right"><asp:Button ID="AddToCartButton" runat="server" Text="Add to Cart" OnClick="AddToCartButton_Click" /></div>--%>
	</asp:Panel>
</div>