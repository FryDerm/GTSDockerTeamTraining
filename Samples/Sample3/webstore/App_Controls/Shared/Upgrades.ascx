<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Upgrades.ascx.cs" Inherits="Gateway.Web.UI.Controls.Upgrades" %>
<%@ Register Src="EventHeader.ascx" TagName="EventHeader" TagPrefix="uc1" %>
<%@ Register Src="EventsDateTimeSelectorModal.ascx" TagName="EventsDateTimeSelectorModal" TagPrefix="uc2" %>
<%@ Register Src="PackageDetailsControl.ascx" TagName="PackageDetailsControl" TagPrefix="uc3" %>
<%@ Register src="DateSpecificSelectorModal.ascx" tagname="DateSpecificSelectorModal" tagprefix="uc4" %>

<script type="text/javascript" language="javascript">
    function removeAllHighlights() {
        $("[id$=ReplacementTable]").removeClass("HighlightElement");
    }

    function HideMessage() {
        $(".PLUErrorLiteral").hide();
        $(".MissingDateTimeButtonLocatorLiteral").hide();
    }

</script>

<div id="Upgrades" data-replace="upgrades">
	<asp:Repeater ID="ReplacementsRepeater" runat="server" OnItemDatabound="ReplacementsRepeater_ItemDataBound">
		<HeaderTemplate>
            <div data-object-key="upsell-option">
			<h2><span data-html="header"><asp:Literal ID="ReplacementHeaderScriptLiteral" runat="server" /></span></h2>
			<table id="ReplacementTable" runat="server">
				<tr>
					<td class="OptionCell" data-el="noThanksRadio">
						<asp:Literal ID="RadioButtonLiteral" runat="server" />
					</td>
					<td data-html="noThanksText"><asp:Label ID="ScriptLabel" runat="server" /></td>
				</tr>
			</table>
		</HeaderTemplate>
		<ItemTemplate>
			<table id="ReplacementTable" runat="server" data-object-key="add-ons">
				<tr>
					<td class="OptionCell">
                        <span data-html="checkbox"><asp:Literal ID="RadioButtonLiteral" runat="server" /></span>
						<span data-el="plu"><asp:HiddenField ID="PLUHiddenField" runat="server" /></span>
						<span data-el="scdid"><asp:HiddenField ID="SCDIDHiddenField" runat="server" /></span>
                        <span data-el="requiresDate"><asp:HiddenField runat="server" id="RequiresDate"/></span>
						<span data-el="requiresIndividualDate"><asp:HiddenField runat="server" id="RequiresIndividualDate"/></span>
						<span data-el="autoSelectEvents"><asp:HiddenField runat="server" id="AutoSelectEvents"/></span>
						<span data-el="isDateSpecific"><asp:HiddenField runat="server" id="IsDateSpecific"/></span>
					</td>
					<td data-text="name"><asp:Label ID="ScriptLabel" runat="server" CssClass="UpsellScript" /></td>
				</tr>
				<tr>
					<td colspan="2">
						<uc3:PackageDetailsControl
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
							visible="false" />
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<div class="UpsellQuantityControls">
							<asp:Literal ID="QuantityToUpgradeLiteral" runat="server" /><span data-el="quantity"><asp:DropDownList ID="QtyDropDownList" runat="server" /></span>
						</div>
						<span class="MissingDateTimeButtonLocatorLiteral"><asp:Literal ID="MissingDateTimeButtonLocatorLiteral" runat="server" Text="*" Visible="false" /></span>
						<div class="PLUErrorLiteral"><asp:Literal ID="PLUErrorLiteral" runat="server" Visible="false" /></div>
					</td>
				</tr>
			</table>
            </div>
		</ItemTemplate>
	</asp:Repeater>
	<span data-el="continue"><asp:Button ID="ContinueButton" runat="server" OnClick="ContinueButton_Click" /></span>
</div>
<uc2:EventsDateTimeSelectorModal
	ID="EventsDateTimeSelectorModal"
	runat="server"
	OnSelectionChanged="EventsDateTimeSelectorModal_SelectionChanged" />
<uc4:DateSpecificSelectorModal 
    ID="DateSpecificSelectorModal" 
    runat="server" 
    OnSelectionChanged="DateSpecificDateTimeSelectorModal_SelectionChanged" />
