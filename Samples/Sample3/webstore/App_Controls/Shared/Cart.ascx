<%@ Control Language="C#" AutoEventWireup="true" Inherits="Gateway.Web.UI.Controls.Cart" Codebehind="Cart.ascx.cs" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ Register src="BrokenRulesControl.ascx" tagname="BrokenRulesControl" tagprefix="uc1" %>
<%@ Register src="PriceControl.ascx" tagname="PriceControl" tagprefix="uc2" %>
<div id="Cart" data-replace="Cart">
    <asp:Literal ID="CartEmptyLiteral" runat="server" Visible="False" />
	<asp:Panel ID="UpdateEnterKeyPanel" DefaultButton="CartUpdateButton" runat="server">
		<asp:GridView ID="CartGridView" runat="server" AutoGenerateColumns="false"  
			GridLines="None" 
			CssClass="CartTable"	    
			OnRowDataBound="CartGridView_RowDataBound">
			<Columns>
				<asp:TemplateField HeaderStyle-CssClass="CartHeaderCell CartHeaderNameCell" ItemStyle-CssClass="CartItemNameCell">
					<HeaderTemplate><span data-table-shift="header" data-text="item-label"><asp:Literal ID="CartHeaderItemLiteral" runat="server" /></span></HeaderTemplate>
					<ItemTemplate>
                        <span data-table-shift="items">
						<span data-el="link"><asp:LinkButton ID="CartItemLinkButton" CssClass="cart-item-link" runat="server" OnClientClick="window.open('../shop/ItemDetailPopUp.aspx?{0}={1}', 'ItemDetail', 'menubar=yes,scrollbars=yes,resizable=yes,width=480,height=560,top=0,left=0');return false;" Visible="false" /></span>
						<span data-text="name"><asp:Literal ID="CartItemNameLiteral" runat="server" Visible="false" /></span>
						<span data-text="event-date-time"><asp:Literal ID="CartItemEventDateTimeLiteral" runat="server" Visible="false" /></span>
						<span data-text="guest-name"><asp:Literal ID="CartGuestNameTextLiteral" runat="server" Visible="false" /></span>
						<span data-el="pass-info-link"><asp:HyperLink ID="PassInfoHyperLink" runat="server" Visible="false" /></span>
						<span data-el="roster-info-link"><asp:HyperLink ID="RosterInfoHyperLink" runat="server" Visible="false" /></span>
						<span data-el="debit-info-link"><asp:HyperLink ID="DebitInfoHyperLink" runat="server" Visible="false" /></span>
						<span class="CartItemDiscount" data-text="discount"><asp:Literal ID="CartItemDiscountLiteral" runat="server" Visible="false" /></span>
						<asp:PlaceHolder ID="PackageDetailsControlPlaceHolder" runat="server" />
						<uc1:BrokenRulesControl ID="BrokenRulesControl" runat="server" />
					</ItemTemplate>
				</asp:TemplateField>
				<asp:TemplateField HeaderStyle-CssClass="CartHeaderCell CartHeaderPriceCell" ItemStyle-CssClass="CartItemCell CartPriceCell">
					<HeaderTemplate>
					    <span data-text="price-label"><asp:Literal ID="CartHeaderPriceLiteral" runat="server" /></span>
                        <asp:Literal ID="CartHeaderPointsLiteral" Visible="False" runat="server" />
					</HeaderTemplate>
					<ItemTemplate>
						<uc2:PriceControl ID="PriceControl" runat="server" />
					</ItemTemplate>
				</asp:TemplateField>
				<asp:TemplateField HeaderStyle-CssClass="CartHeaderCell CartHeaderQuantityCell" ItemStyle-CssClass="CartItemCell CartQuantityCell">
					<HeaderTemplate><span data-text="quantity-label"><asp:Literal ID="CartHeaderQuantityLiteral" runat="server" /></span></HeaderTemplate>
					<ItemTemplate>
						<span data-el="order-line-hidden"><asp:HiddenField ID="OrderLineIDHiddenField" runat="server" /></span>
						<span data-el="parent-id-hidden"><asp:HiddenField ID="ParentIDHiddenField" runat="server" /></span>
						<span data-el="quantity-input"><cc1:NumericTextBox ID="CartItemQuantityTextBox" MaxLength="4" Width="30" runat="server" Visible="false" /></span>
						<span data-text="quantity"><asp:Literal ID="CartItemQuantityLiteral" runat="server" Visible="false" /></span>
					</ItemTemplate>
				</asp:TemplateField>
				<asp:TemplateField HeaderStyle-CssClass="CartHeaderCell CartHeaderTotalCell" ItemStyle-CssClass="CartItemCell CartTotalCell">
					<HeaderTemplate><span data-text="total-label"><asp:Literal ID="CartHeaderTotalLiteral" runat="server" /></span></HeaderTemplate>
					<ItemTemplate><span data-text="total"><asp:Literal ID="CartItemTotalLiteral" runat="server" /></span></ItemTemplate>
				</asp:TemplateField>
				<asp:TemplateField HeaderStyle-CssClass="CartHeaderCell CartHeaderAccrualPointsCell" ItemStyle-CssClass="CartItemCell CartAccrualPointsCell">
					<HeaderTemplate><span data-text="points-label"><asp:Literal ID="CartHeaderAccrualPointsLiteral" runat="server" Text="Accrual Pts" /></span></HeaderTemplate>
					<ItemTemplate><asp:Literal ID="CartItemAccrualPointsLiteral" runat="server" /></ItemTemplate>
				</asp:TemplateField>
				<asp:TemplateField HeaderStyle-CssClass="CartHeaderCell CartHeaderRemoveCell" ItemStyle-CssClass="CartItemCell CartRemoveCell">
					<HeaderTemplate><span data-text="remove-label"><asp:Literal ID="CartHeaderRemoveLiteral" runat="server" /></span></HeaderTemplate>
					<ItemTemplate><span data-html="remove"><asp:CheckBox ID="CartItemRemoveCheckBox" runat="server" /></span></ItemTemplate>
				</asp:TemplateField>
			</Columns>
		</asp:GridView>
		<table cellpadding="0" cellspacing="0" class="DiscountAndFooterTable">
			<tr>
				<td>
					<asp:Panel ID="DiscountPanel" DefaultButton="ApplyDiscountButton" runat="server">
						<div id="Discount">
							<table>
								<tr><td><asp:Label ID="DiscountInformationLabel" runat="server" /></td></tr>
								<tr>
									<td>
										<span data-text="discount-label"><asp:Label ID="DiscountCodeLabel" AssociatedControlID="DiscountCodeTextBox" runat="server" /></span>&nbsp;&nbsp;
										<span data-el="discount-input"><asp:TextBox ID="DiscountCodeTextBox" MaxLength="30" Width="75" runat="server" /></span>&nbsp;&nbsp;
										<span data-el="discount-button"><asp:Button ID="ApplyDiscountButton" CssClass="dark" runat="server" CausesValidation="false" OnClick="ApplyDiscountButton_OnClick" /></span>
									</td>
								</tr>
							</table>
						</div>
					</asp:Panel>
				</td>
				<td class="text-right">
					<asp:Panel ID="CartFooterPanel" runat="server">
						<div id="CartFooter">
							<table>
								<tr id="CartFooterUpdateRow" class="cart-footer-row update-row" runat="server">
									<td colspan="3" class="text-right">
                                        <span data-el="updateButton">
										    <asp:Button ID="CartUpdateButton" CssClass="dark" runat="server" OnClick="CartUpdateButton_OnClick" />
                                        </span>
									</td>
								</tr>
								<tr id="CartFooterSubTotalRow" class="cart-footer-row subtotal-row" runat="server">
									<td></td>
									<td data-text="footer-subtotal-label"><asp:Literal ID="CartFooterSubTotalLiteral" runat="server" /></td>
									<td align="right" data-text="footer-subtotal-value"><asp:Literal ID="CartFooterSubTotalValueLiteral" runat="server" /></td>
								</tr>
								<tr id="CartFooterFeesRow" class="cart-footer-row fees-row" runat="server" visible="false">
									<td data-el="whats-this-fee"><asp:HyperLink ID="WhatsThisFeeHyperLink" runat="server" /></td>
									<td data-text="footer-fee-label"><asp:Literal ID="CartFooterFeeLiteral" runat="server" /></td>
									<td align="right" data-text="footer-fee-value"><asp:Literal ID="CartFooterFeeValueLiteral" runat="server" /></td>
								</tr>
								<tr id="CartFooterTaxRow" class="cart-footer-row tax-row" runat="server">
									<td></td>
									<td data-text="footer-tax-label"><asp:Literal ID="CartFooterTaxLiteral" runat="server" /></td>
									<td align="right" data-text="footer-tax-value"><asp:Literal ID="CartFooterTaxValueLiteral" runat="server" /></td>
								</tr>
								<tr id="CartFooterShippingRow" class="cart-footer-row shipping-row" runat="server">
									<td></td>
									<td data-text="footer-shipping-label"><asp:Literal ID="CartFooterShippingLiteral" runat="server" /></td>
									<td align="right" data-text="footer-shipping-value"><asp:Literal ID="CartFooterShippingValueLiteral" runat="server" /></td>
								</tr>
								<tr id="CartFooterDownPaymentAmountRow" class="cart-footer-row downpayment-row" runat="server" visible="false">
									<td></td>
									<td data-text="footer-down-payment-literal"><asp:Literal ID="CartFooterDownPaymentAmountLiteral" runat="server" /></td>
									<td align="right" data-text="footer-down-payment-value"><asp:Literal ID="CartFooterDownPaymentAmountValueLiteral" runat="server" /></td>
								</tr>
								<tr class="cart-footer-row hr-row">
									<td colspan="3"><hr /></td>
								</tr>
								<tr id="CartFooterTotalRow" class="cart-footer-row total-row" runat="server">
									<td></td>
									<td data-text="footer-total-label"><asp:Literal ID="CartFooterTotalLiteral" runat="server" /></td>
									<td data-text="footer-total-value" align="right"><asp:Literal ID="CartFooterTotalValueLiteral" runat="server" /></td>
								</tr>
								<tr id="CartFooterRemeptionTotalRow" class="cart-footer-row redemption-row" runat="server" visible="false">
									<td></td>
									<td data-text="footer-redemption-points-label"><asp:Literal ID="CartFooterRedemptionPointsLiteral" runat="server" /></td>
									<td data-text="footer-redemption-points-value" align="right"><asp:Literal ID="CartFooterRedemptionPointsValueLiteral" runat="server" /></td>
								</tr>
								<tr id="CartFooterDownPaymentTotalRow" class="cart-footer-row downpayment-row" runat="server" visible="false">
									<td></td>
									<td data-text="footer-down-payment-label"><asp:Literal ID="CartFooterDownPaymentLiteral" runat="server" /></td>
									<td align="right" data-text="footer-down-payment-total-value"><asp:Literal ID="CartFooterDownPaymentTotalLiteral" runat="server" /></td>
								</tr>
								<tr id="CartFooterDiscountRow" runat="server" class="cart-footer-row discount-row" visible="false">
									<td colspan="3" data-text="footer-discount"><asp:Literal ID="CartFooterTotalDiscountLiteral" runat="server" /></td>
								</tr>
								<tr id="CartFooterBonusAccrualPointsRow" class="cart-footer-row bonus-row" runat="server" visible="false">
									<td></td>
									<td data-text="footer-bonus-points-label"><asp:Literal ID="CartFooterAccrualBonusPointsLiteral" runat="server" /></td>
									<td align="right" data-text="footer-bonus-points-value"><asp:Literal ID="CartFooterAccrualBonusPointsValueLiteral" runat="server" /></td>
								</tr>
								<tr id="CartFooterAccrualPointsRow" class="cart-footer-row accrual-row" runat="server" visible="false">
									<td></td>
									<td data-text="footer-accrual-label"><asp:Literal ID="CartFooterAccrualPointsLiteral" runat="server" /></td>
									<td align="right" data-text="footer-accrual-value"><asp:Literal ID="CartFooterAccrualPointsValueLiteral" runat="server" /></td>
								</tr>
							</table>
						</div>
					</asp:Panel>
				</td>
				</tr>
				<tr id="CartFooterButtonsTableRow" runat="server">
					<td colspan="2">
						<div id="CartFooterButtons">
							<table>
								<tr>
									<td>
										<span data-el="continue-shopping-button"><asp:Button ID="ContinueShoppingButton" CssClass="dark" runat="server" OnClick="ContinueShoppingButton_OnClick" /></span>
										<span data-el="renew-another-pass-button"><asp:Button ID="RenewAnotherPassButton" runat="server" OnClick="RenewAnotherPassButton_OnClick" /></span>
									</td>
									<td align="right"><span data-el="checkout-button"><asp:Button ID="CheckoutButton" runat="server" OnClick="CheckoutButton_OnClick" /></span></td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
			</table>
	</asp:Panel>
</div>