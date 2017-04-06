<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="SalesChannelDetailPLUControl.ascx.cs" Inherits="Gateway.Web.UI.Controls.SalesChannelDetailPLUControl" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc2" %>
<%@ Register src="EventsHeader.ascx" tagname="EventsHeader" tagprefix="uc1" %>
<%@ Register src="PriceControl.ascx" tagname="PriceControl" tagprefix="uc2" %>
<%@ Register src="BrokenRulesControl.ascx" tagname="BrokenRulesControl" tagprefix="uc3" %>
<div class="SalesChannelDetailPLURepeater" data-object-key='sub-category'>
	

	<asp:Panel ID="PLUPanel" runat="server" DefaultButton="AddToCartButton">
		<div class="pluWrapper">
			<% // ----- Parent SCD info ----- %>
			<div class="parentSCDheader">
				<div class="parentSCDImage" data-el='parentSCDImage'><asp:Image ID="ParentSCDImage" runat="server" Visible="false" CssClass="parentSCDImage" /></div>
				<div class="parentSCDName" data-html='parentSCDName'><asp:Literal ID="ParentSCDNameLiteral" runat="server" /></div>
				<div class="parentSCDDescription" data-html='parentSCDDescription'><asp:Literal ID="ParentSCDDescriptionLiteral" runat="server" /></div>
				<div class="parentSCDID" data-el="parentSCDID"><asp:HiddenField ID="parentSCDID" runat="server" /></div>
				<div data-text="parentSCDAutoSelectEvents"><asp:Literal ID="autoSelectEvents" runat="server" /></div>
			</div>
            <div data-el='moreInfoLink'>
			    <asp:LinkButton ID="CompleteDetailsLinkButton" runat="server" CssClass="completeDetails" Text="Complete Details" OnClientClick="ItemDetailPopUp.aspx?{0}={1}" Visible="false" />
			</div>
            <% // ----- Shared events calendar ----- %>
			<uc1:EventsHeader ID="EventsHeader" runat="server" Visible="false" />
			<% // ----- PLU repeater ----- %>
			<asp:Repeater ID="SalesChannelDetailPLURepeater" runat="server" OnItemDataBound="SalesChannelDetailPLURepeater_ItemDataBound">
				<HeaderTemplate>
					<div class="pluHeader"></div><!-- This DIV is for PLU header image -->
					<table class="pluTable" cellpadding="2" cellspacing="0" border="0">
						<tr class="pluHeaderRow" id="pluHeaderRow" runat="server">
							<th class="pluInfoHeader" data-text="pluInfoHeader">
							    <asp:Literal ID="PLUDescriptionHeaderLiteral" runat="server" />
							</th>
							<th class="pluAccrualPointsHeader" data-text="plu-accrual-points-header" id="PLUAccrualPointsHeader" runat="server" Visible="false"><asp:Label ID="PLUAccrualPointsHeaderLabel" runat="server" /></th>
							<th class="pluSelectionControlsHeader">
								<div class="pluPriceQuantity">
									<div class="pluPrice">
									    <span data-text="pluPointsHeader"><asp:Literal ID="PLUPointsHeaderLiteral" runat="server" Visible="false" /></span>
                                        <span data-text="pluPriceHeader"><asp:Literal ID="PLUPriceHeaderLiteral" runat="server" /></span>
									</div>
									<div class="pluQuantity" data-text="plu-quantity-header"><asp:Literal ID="PLUQuantityHeaderLiteral" runat="server" /></div>
								</div>
							</th>
						</tr>
				</HeaderTemplate>
				<ItemTemplate>
					<tr id="pluRow" class="pluRow" data-object-key="items" runat="server">
						<td class="pluInfo">
							<% // ----- PLU info ----- %>
							<span data-el="plu-image"><asp:Image ID="PLUImage" runat="server" Visible="false" CssClass="pluImage" /></span>
							<asp:PlaceHolder ID="PLUControlsPlaceHolder" runat="server">
								<div class="pluNameShortName">
									<div class="pluName" data-html="pluName"><asp:Literal ID="ProductNameLiteral" runat="server" /></div>
                                    <div class="pluShortName" data-html="pluShortName"><asp:Literal ID="ProductShortNameLiteral" runat="server" /></div>
									&nbsp;<% // the nbsp is important here, don't remove it, css on the containing div will only be applied if the nbsp is present %></div>
								<div class="pluDescription" data-html="plu-desc"><asp:Literal ID="ProductDescriptionLiteral"	runat="server" /></div>
							    <span da><asp:Panel ID="PaymentPlanPanel" runat="server" /></span>
								<span data-list="error-list">
								<uc3:BrokenRulesControl ID="BrokenRulesControl" runat="server" />
                                    </span>
							</asp:PlaceHolder>
							<asp:PlaceHolder ID="PackageDetailsControlPlaceHolder" runat="server" />
							<asp:HiddenField ID="SCDID" runat="server" />
							<span data-el="PassKindId"><asp:HiddenField ID="PassKindId" runat="server"/></span>
							<span data-el="IsJointMembership"><asp:HiddenField ID="IsJointMembership" runat="server"/></span>
						</td>
						<td class="pluAccrualPoints" ID="PLUAccrualPointsCell" runat="server" Visible="false" data-text="accrual-points">
						    <asp:Literal ID="PLUAccuralPointsLiteral" runat="server" />

						</td>
						<td class="pluSelectionControls">

							<% // ----- Events calendar ----- %>
							<asp:Panel ID="CalendarControlsPanel"  CssClass="CalendarControlsPanel" runat="server" Visible="false">
                                <span data-is-event="true"></span>
                                <span data-sharedCalendar="false"></span>
								<span data-el="selectedDate"><asp:Label ID="SelectedDateLabel" runat="server" Visible="false" CssClass="SelectedDateLabel" /></span>
								<span data-el="selectDateTimeButton"><asp:ImageButton ID="CalendarImageButton" runat="server" ImageUrl="~/images/GTS/CalendarIcon.gif" Visible="false" OnClick="CalendarImageButton_Click" /></span>
								<span data-el="clearDateTimeButton"><asp:ImageButton ID="ClearCalendarImageButton" runat="server" CssClass="event-calendar-icon" ImageUrl="~/images/GTS/calendarSubtract.png" OnClick="ClearCalendarImageButton_Click" ToolTip="Clear Event" /></span>
                                <span data-el="requiresDate"><asp:HiddenField runat="server" id="RequiresDate"/></span>
								<span data-el="requiresIndividualDate"><asp:HiddenField runat="server" id="RequiresIndividualDate"/></span>
								<span data-el="autoSelectEvents"><asp:HiddenField runat="server" id="AutoSelectEvents"/></span>
								<span data-el="isDateSpecific"><asp:HiddenField runat="server" id="IsDateSpecific"/></span>
							</asp:Panel>

							<% // ----- Multi-select events calendar ----- %>
							<asp:Panel CssClass="PLUSelectMultiTimesEventPanel" ID="PLUSelectMultiTimesEventPanel" Visible="false" runat="server">
                                <span data-is-multi-time="true"></span>
								<asp:Label ID="SelectMultiTimesLabel" runat="server" Visible="false" CssClass="SelectMultiTimesLabel" />
								<span data-el="selectDateTimeButton"><asp:ImageButton ID="SelectMultiTimesEventImageButton" ImageUrl="~/images/GTS/CalendarIcon.gif" Visible="false" runat="server" OnClick="SelectMultiTimesEventImageButton_Click" /></span>
                                <span data-el="clearDateTimeButton"><asp:ImageButton ID="ClearMultiTimesEventImageButton" ImageUrl="~/images/GTS/calendarSubtract.png" Visible="false" runat="server" OnClick="ClearMultiTimesEventImageButton_Click" ToolTip="Clear Event" /></span>
							</asp:Panel>

							<% // ----- Price/Qty ----- %>
							<div class="pluPriceQuantity">
								<div class="pluPrice"><uc2:PriceControl ID="PriceControl" DisplayZeroDollarEditablePrice="false" runat="server" /></div>
								<div class="pluQuantity">
									<span data-el="quantityInput"><cc1:NumericTextBox ID="PLUQuantityTextBox" CssClass="PLUQtyTextBox" Columns="1" MaxLength="4" runat="server" /></span>
									<span data-el="quantitySpinners"></span><cc2:NumericUpDownExtender ID="PLUQuantityUpDownExtender" runat="server" Enabled="false" TargetControlID="PLUQuantityTextBox" Width="60" Minimum="0" /></span>
								</div>
                                <div><asp:Label ID="PLUNoAvailabilityLabel" Visible="false" runat="server" CssClass="pluNoAvailability" /></div>
							</div>
							<% // ----- Error msg ----- %>
							<span class="MissingDateTimeButtonLocatorLiteral" data-text="missingDateTimeButton"><asp:Literal ID="MissingDateTimeButtonLocatorLiteral" runat="server" Text="*" Visible="false" /></span>
							<div class="pluErrorLiteral" data-text="priceError"><asp:Literal ID="PLUErrorLiteral" runat="server" Visible="false" /></div>
                        </td>
                        <td>
						     <% // ----- Multi-select events calendar :: selected date/times display ----- %>
						    <asp:PlaceHolder ID="MultiTimeEventsPLUDetailsPlaceHolder" runat="server" />
                            </div>
					    </td>
					</tr>
				</ItemTemplate>
				<FooterTemplate>
					</table>
				</FooterTemplate>
			</asp:Repeater>
			<span data-el='add-to-cart'><asp:Button ID="AddToCartButton" CssClass="addToCart" runat="server" OnClick="AddToCartButton_Click" /></span>
		</div>
	</asp:Panel>
</div>