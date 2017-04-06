<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="AddOns.ascx.cs" Inherits="Gateway.Web.UI.Controls.AddOns" %>
<%@ Register Src="EventHeader.ascx" TagName="EventHeader" TagPrefix="uc1" %><%@ Register Src="PackageDetailsControl.ascx" TagName="PackageDetailsControl" TagPrefix="uc2" %><%@ Register Src="EventsDateTimeSelectorModal.ascx" TagName="EventsDateTimeSelectorModal" TagPrefix="uc2" %><%@ Register src="DateSpecificSelectorModal.ascx" tagname="DateSpecificSelectorModal" tagprefix="uc3" %>
<div id="AddOns" data-replace="addOns">
	<asp:Repeater ID="UpsellOptionGroupsRepeater" runat="server" OnItemDataBound="UpsellOptionGroupsRepeater_ItemDataBound">
		<ItemTemplate>
            <div data-object-key="upsell-option">
			<h2><span data-html="header"><asp:Literal ID="AddOnHeaderScriptLiteral" runat="server" /></span></h2>
			<span data-el="order-line"><asp:HiddenField ID="OrderLineIDHiddenField" runat="server" /></span>
			<asp:Repeater ID="AddOnsRepeater" runat="server" OnItemDatabound="AddOnsRepeater_ItemDataBound">
				<ItemTemplate>
					<table id="AddOnTable" runat="server" data-object-key="add-ons">
						<tr>
							<td class="OptionCell">
								<span data-html="checkbox"><asp:CheckBox ID="AddOnCheckBox" runat="server" /></span>
								<span data-el="plu"><asp:HiddenField ID="PLUHiddenField" runat="server" /></span>
								<span data-el="scdid"><asp:HiddenField ID="SCDIDHiddenField" runat="server" /></span>

                                <span data-el="requiresDate"><asp:HiddenField runat="server" id="RequiresDate"/></span>
								<span data-el="requiresIndividualDate"><asp:HiddenField runat="server" id="RequiresIndividualDate"/></span>
								<span data-el="autoSelectEvents"><asp:HiddenField runat="server" id="AutoSelectEvents"/></span>
								<span data-el="isDateSpecific"><asp:HiddenField runat="server" id="IsDateSpecific"/></span>
							</td>
							<td>
								<span data-text="name"><asp:Label ID="ScriptLabel" runat="server" /></span><br />
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<uc2:PackageDetailsControl
										ID="PackageDetailsControl"
										runat="server"
										OnSelectEventDateTime="InitiateDateTimeSelection"
                                        OnClearEventsDateTime="ClearEventsDateTimeSelection"
										ProcessOnLoad="false"
										Visible="false" />
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<uc1:EventHeader
									ID="EventHeader"
									runat="server"
									OnInitiateDateTimeSelection="InitiateDateTimeSelection"
                                    OnClearPackageEventDateTime="ClearDateTimeSelection"
									Visible="false" />
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<div class="UpsellQuantityControls">
									<asp:Literal ID="QuantityToAddLiteral" runat="server" /> <span data-el="quantity"><asp:DropDownList ID="QtyDropDownList" runat="server" /></span>
								</div>
								<span class="MissingDateTimeButtonLocatorLiteral"><asp:Literal ID="MissingDateTimeButtonLocatorLiteral" runat="server" Text="*" Visible="false" /></span>
								<span data-text="pluError"><div class="PLUErrorLiteral"><asp:Literal ID="PLUErrorLiteral" runat="server" Visible="false" /></div></span>
							</td>
						</tr>
					</table>
				</ItemTemplate>
			</asp:Repeater>
            </div>
		</ItemTemplate>
	</asp:Repeater>
	<span data-el="continue"><asp:Button ID="ContinueButton" runat="server" OnClick="ContinueButton_Click" /></span>
</div>
<uc2:EventsDateTimeSelectorModal
	ID="EventsDateTimeSelectorModal"
	runat="server"
	OnSelectionChanged="EventsDateTimeSelectorModal_SelectionChanged" />
<uc3:DateSpecificSelectorModal 
    ID="DateSpecificSelectorModal" 
    runat="server" 
    OnSelectionChanged="DateSpecificDateTimeSelectorModal_SelectionChanged" />
