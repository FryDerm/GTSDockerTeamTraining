<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Shop.GroupSalesVerifyLimits" Title="Untitled Page" Codebehind="GroupSalesVerifyLimits.aspx.cs" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Register src="../App_Controls/TimeSelector.ascx" tagname="TimeSelector" tagprefix="uc1" %>
<%@ Register src="../App_Controls/CalendarSelector.ascx" tagname="CalendarSelector" tagprefix="uc2" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
	<div id="GroupSalesVerifyLimits" data-replace="GroupSalesLimits">
	    <div data-replace="GroupSalesVerifyLimits" data-parser="wshtml">
		    <cc1:HtmlContent id="HeaderHtmlContent" Kind="GroupSalesVerifyLimits" runat="server" />
        </div>
		<table>
			<tr>
				<td valign="top">
					<div data-html="selectedDate"><asp:Literal ID="ArrivalDateLiteral" runat="server" /></div>
                    <div data-html="calendarHtml">
					    <uc2:CalendarSelector
						    ID="VisitDateCalendarSelector"
						    OnSelectionChanged="VisitDateCalendarSelector_SelectionChanged"
                            OnDayRender="CalendarSelector_DayRender"
						    OnMonthChanged="CalendarSelector_MonthChanged"								
						    runat="server" />
                    </div>
				</td>
				<td valign="top">
					<table>
						<tr>
							<td>
								<span data-text="selectedArrivalTime"><asp:Literal ID="ArrivalTimeLiteral" runat="server" /></span>
                                <span data-html="timeSelector">
								    <uc1:TimeSelector ID="TimeSelectorControl" runat="server" />
                                </span>
							</td>
						</tr>
						<tr>
							<td>
								<asp:Literal ID="ExpectedGuestsLiteral" runat="server" />
								<br />
								<span data-el="expectedGuests"><cc1:NumericTextBox ID="ExpectedGuestsNumericTextBox" runat="server" /></span>
								<span data-text="expectedGuestsError"><asp:RequiredFieldValidator ID="ExpectedGuestsFieldValidator" runat="server" ControlToValidate="ExpectedGuestsNumericTextBox" Display="Dynamic" /></span>
							</td>
						</tr>
						<tr>
							<td>
								<asp:Literal ID="GroupDescriptionLiteral" runat="server" /><br />
								<span data-el="groupDesc"><asp:TextBox ID="GroupDescriptionTextBox" runat="server" Columns="50" /></span>
							</td>
						</tr>
					</table>
					<span data-el="continueButton"><asp:Button ID="ContinueButton" runat="server" OnClick="ContinueButton_OnClick" /></span>
				</td>
			</tr>
		</table>
    </div>
    <% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/groupSalesVerifyLimits.html") %>
</asp:Content>