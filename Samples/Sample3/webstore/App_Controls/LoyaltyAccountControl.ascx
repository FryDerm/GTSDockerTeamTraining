<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="LoyaltyAccountControl.ascx.cs" Inherits="Gateway.WebStore.LoyaltyAccountControl" %>
<asp:Panel ID="LoyaltyAccountEntryPanel" runat="server" Visible="false" DefaultButton="LoyaltyAccountButton">
	<div id="LoyaltyAccountEntry" class="displayBlock" data-is-login="true">
		<p data-text="desc"><asp:Literal ID="EnterLoyaltyMessageLiteral" runat="server" />&nbsp;<asp:Literal ID="LoyaltyEnrollmentMessageLiteral" runat="server" /></p>
		<div id="LoyaltyAccountEntryControls">
			<span data-text="accountNumberLabel"><asp:Literal ID="LoyaltyAccountNumberEntryLiteral" runat="server" /></span>&nbsp;<span data-el="accountNumberInput"><asp:TextBox ID="LoyaltyAccountNumberTextBox" runat="server" /></span>
			<span data-el="submit"><asp:Button ID="LoyaltyAccountButton" runat="server" OnClick="LoyaltyAccountButton_Click" CausesValidation="false" /></span>
		</div>
		<span data-el="enrollLink"><asp:HyperLink ID="LoyaltyEnrollmentHyperLink" runat="server" NavigateUrl="~/LoyaltyPrograms/LoyaltyEnrollment.aspx" /></span>
	</div>
</asp:Panel>
<asp:PlaceHolder ID="LoyaltyAccountDisplayPlaceHolder" runat="server" Visible="false">
	<div id="LoyaltyAccountDisplay" class="displayBlock" data-is-account="true">
		<table>
			<tr>
				<td colspan="2" id="LoyaltyExpirationCell" runat="server" visible="false">
					<div id="LoyaltyExpiration">
						<asp:Literal ID="LoyaltyExpirationLiteral" runat="server" />
						<ul>
							<li><asp:Literal ID="LoyaltyExpirationAccrualLiteral" runat="server" /></li>
							<li id="LoyaltyExpirationRedemptionValidListItem" runat="server" visible="false"><asp:Literal ID="LoyaltyExpirationRedemptionValidLiteral" runat="server" /></li>
							<li id="LoyaltyExpirationRedemptionExpirationListItem" runat="server" visible="false"><asp:Literal ID="LoyaltyExpirationRedemptionLiteral" runat="server" /></li>
						</ul>
					</div>
				</td>
			</tr>
			<tr>
				<td>
					<table>
						<tr>
							<td class="Description" data-text="programNameLabel"><asp:Literal ID="LoyaltyProgramNameHeaderLiteral" runat="server" /></td>
							<td class="Value" colspan="2" id="LoyaltyProgramNameValue" data-text="programNameValue"><asp:Literal ID="LoyaltyProgramNameValueLiteral" runat="server" /></td>
						</tr>
						<tr>
							<td class="Description" data-text="accountNumberLabel"><asp:Literal ID="LoyaltyAccountNumberHeaderLiteral" runat="server" /></td>
							<td class="Value" id="LoyaltyAccountNumberValue" data-text="accountNumberValue"><asp:Literal ID="LoyaltyAccountNumberValueLiteral" runat="server" /></td>
							<td id="ChangeLoyaltyAccount"data-el="logoutLink"><asp:LinkButton ID="ChangeLoyaltyAccountLinkButton" runat="server" OnClick="ChangeLoyaltyAccountLinkButton_Click" /></td>
						</tr>
						<tr>
							<td class="Description" data-text="balanceLabel"><asp:Literal ID="LoyaltyAccrualBalanceHeaderLiteral" runat="server" /></td>
							<td class="Value" id="LoyaltyAccrualBalanceValue" data-text="balanceValue"><asp:Literal ID="LoyaltyAccrualBalanceValueLiteral" runat="server" /></td>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td class="Description" data-text="joinDateLabel"><asp:Literal ID="LoyaltyJoinDateHeaderLiteral" runat="server" /></td>
							<td class="Value" id="LoyaltyJoinDateValue" data-text="joinDateValue"><asp:Literal ID="LoyaltyJoinDateValueLiteral" runat="server" /></td>
							<td>&nbsp;</td>
						</tr>
					</table>
				</td>
				<td class="AccrualRedeemOptionsCell" id="LoyaltyAccrualRedeemOptionsCell" runat="server">
                    <span data-el="earnRadio">
					    <asp:RadioButton ID="LoyaltyEarnRadioButton" GroupName="LoyaltyAccrualRedeemRadioButtonGroup" OnCheckedChanged="LoyaltyEarnRadioButton_CheckedChanged" runat="server" AutoPostBack="true" />
					</span>
                    <span data-el="redeemRadio">
                        <asp:RadioButton ID="LoyaltyRedeemRadioButton" GroupName="LoyaltyAccrualRedeemRadioButtonGroup" OnCheckedChanged="LoyaltyRedeemRadioButton_CheckedChanged" runat="server" AutoPostBack="true" />
				    </span>
                </td>
			</tr>
		</table>
	</div>
</asp:PlaceHolder>