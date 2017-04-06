<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Checkout.ReviewOrder" Title="Untitled Page" Codebehind="ReviewOrder.aspx.cs" %>
<%@ Register Src="../App_Controls/OrderInfo.ascx" TagName="OrderInfo" TagPrefix="uc1" %>
<%@ Register Src="../App_Controls/FOPsForm.ascx" TagName="FOPsForm" TagPrefix="uc2" %>
<%@ Register Src="../App_Controls/LoyaltyAccountControl.ascx" TagName="LoyaltyAccountControl" TagPrefix="uc3" %>
<%@ Register Src="../App_Controls/Shared/Donation/DonationPrompt.ascx" TagName="DonationPrompt" TagPrefix="uc4" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
	<asp:ScriptManager ID="ScriptManager1" runat="server" />
	<div id="ReviewOrder">
		<div id="ProcessingInformation" style="display:none;">
			<asp:Literal ID="ProcessingLiteral" runat="server" />
		</div>
		<div id="PrintOnWebProcessingInformation" style="display:none;">
			<asp:Literal ID="PrintOnWebProcessingLiteral" runat="server" />
		</div>
		<div id="ReviewOrderInformation" style="display:block;">
			<cc1:HtmlContent ID="ReviewOrderHtmlContent" Kind="ReviewOrder" runat="server" />
			
			<div id="ThreatMetrix"  runat="server" Visible="False">
				<script>threatMetrixLoaded = true;</script>

				<%--Begin ThreatMetrix profiling tags below --%>
				<%--note: replace 'UNIQUE_SESSION_ID' with a uniquely generated handle 
					note: 'PAGEID' is only needed for TDCloud, replace 'PAGEID' with an unique ID for that page, if omitted, default is 1
					note: for production, replace 'h.online-metrix.net' with a local
						  URL and configure your web server to redirect to
						  'h.online-metrix.net'--%>      

				<div style="background:url(https://h.online-metrix.net/fp/clear.png?org_id=hualvosf&amp;session_id=<%= Session.SessionID %>&amp;m=1)">
				</div>                                                                                                
                                                                                                
				<img src="https://h.online-metrix.net/fp/clear.png?org_id=hualvosf&amp;session_id=<%= Session.SessionID %>&amp;m=2" />    
                                                                                                                                
				<script src="https://h.online-metrix.net/fp/check.js?org_id=hualvosf&amp;session_id=<%= Session.SessionID %>">
				</script>
				<object type="application/x-shockwave-flash" data="https://h.online-metrix.net/fp/fp.swf?org_id=hualvosf&amp;session_id=<%= Session.SessionID %>" width="1" height="1">
					<param name="movie" value="https://h.online-metrix.net/fp/fp.swf?org_id=hualvosf&amp;session_id=<%= Session.SessionID %>" />                    
					<param name="wmode" value="transparent" />
					<div></div>
				</object>
                                                                                                                                
				<!-- End profiling tags -->
			</div>

			<asp:Panel ID="ReviewOrderPanel" runat="server">
			<uc3:LoyaltyAccountControl
					ID="LoyaltyAccountControl"
					runat="server"
					OnLoyaltyAccountValidated="LoyaltyAccountControl_LoyaltyChanged"
					OnLoyaltyAccountValidationFailed="LoyaltyAccountControl_LoyaltyAccountValidationFailed"
					OnLoyaltyModeChanged="LoyaltyAccountControl_LoyaltyChanged"
					OnLoyaltyModeFailed="LoyaltyAccountControl_LoyaltyModeFailed"
					OnLoyaltyProgramCleared="LoyaltyAccountControl_LoyaltyChanged" />
			<table width="100%">
				<tr>
					<td>
						<uc1:OrderInfo ID="OrderInfoControl" runat="server" />
						<uc4:DonationPrompt ID="DonationPrompt"	runat="server" />
					</td>
				</tr>
				<asp:PlaceHolder ID="OrderNotesPlaceHolder" runat="server">
				<tr>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td>
						<asp:Label ID="OrderNoteLabel" runat="server" />
					</td>	
				</tr>
				<tr>
					<td>
						<hr size="1" noshade />
					</td>
				</tr>
				<tr>
					<td valign="top">
						<asp:TextBox ID="OrderNoteTextBox" runat="server" TextMode="MultiLine" Rows="4" Width="100%" />
					</td>
				</tr>
				<tr>
					<td>&nbsp;</td>
				</tr>
				</asp:PlaceHolder>
                
                <asp:PlaceHolder ID="PersonalMessagePlaceHolder" runat="server" Visible="False">
				<tr>
					<td>&nbsp;</td>
				</tr>
        		<tr>
    			<td>
					<asp:Label ID="PersonalMessageLabel" runat="server" />
				</td>	
				</tr>
		
                <tr>
					<td>
						<hr size="1" noshade />
					</td>
				</tr>
				<tr>
					<td valign="top">
						<asp:TextBox ID="PersonalMessageTextBox" runat="server" TextMode="MultiLine" Rows="4" Width="100%" />
					</td>
				</tr>
				<tr>
					<td>&nbsp;</td>
				</tr>
                </asp:PlaceHolder>

				<tr>
					<td>
						<asp:UpdatePanel ID="UpdatePanel1" runat="server">
							<ContentTemplate>
                                <asp:PlaceHolder ID="GroupSalesPaymentProviderRadioButtonGroup" runat="server" Visible="false" >
                                    <asp:RadioButton ID="GroupSalesPayByCreditCardRadioButton" runat="server" GroupName="GroupSalesPayByRadioButtonGroup" AutoPostBack="true" OnCheckedChanged="GroupSalesPayByCreditCardRadioButton_CheckedChanged"  /><br/>
                                    <asp:RadioButton ID="GroupSalesPayByAccountRadioButton" runat="server" GroupName="GroupSalesPayByRadioButtonGroup" AutoPostBack="true" OnCheckedChanged="GroupSalesPayByAccountRadioButton_CheckedChanged" /><br/>
                                    
                                    <asp:PlaceHolder ID="PONumberPlaceHolder" runat="server" Visible="false">
                                        <asp:Label ID="ExclusivePONumberLabel" runat="server" />
                                        <asp:TextBox ID="PONumberTextBox" runat="server" />
                                    </asp:PlaceHolder>
                                    

                                </asp:PlaceHolder>		   
								<uc2:FOPsForm ID="FOPsForm" runat="server" />
							</ContentTemplate>
						</asp:UpdatePanel>
						<asp:CheckBox ID="StorePaymentCheckBox" runat="server" Visible="false" />
					</td>
				</tr>
				
				<asp:PlaceHolder ID="PaymentPlanPlaceHolder" runat="server">
				<tr>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td>
						<asp:Literal ID="ReviewContractLiteral" runat="server" />
					</td>
				</tr>
				<tr>
					<td>
						<asp:Button ID="ReviewContractButton" runat="server" OnClick="ReviewContractButton_OnClick" />
					</td>
				</tr>
				</asp:PlaceHolder>
				<tr>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td>
						<div id="OptInOptInEmailNewsLetter">
							<asp:PlaceHolder ID="OptInEmailNewsLetterPlaceHolder" runat="server">
								<asp:CheckBox ID="OptInEmailNewsLetterCheckBox" runat="server" /><br />
							</asp:PlaceHolder>
						</div>
						<div id="SurveyOptIn">
							<asp:PlaceHolder ID="SurveyOptInPlaceHolder" runat="server">
								<asp:CheckBox ID="SurveyOptInCheckBox" runat="server" /><br />
							</asp:PlaceHolder>
						</div>

						<div id="OptInSurveyAndEmailNewLetter">
							<asp:PlaceHolder ID="SurveyAndNewsLetterOptInPlaceHolder" runat="server" Visible="false">
								<asp:CheckBox ID="SurveyAndNewsLetterOptInCheckBox" runat="server" />
							</asp:PlaceHolder>
						</div>

						<div id="TermsAndConditions">
							<asp:PlaceHolder ID="TermsAndConditionsPlaceHolder" runat="server">
								<cc1:HtmlContent ID="TermsAndConditionsHtmlContent" Kind="TermsAndConditions" runat="server" Visible="false"/><br />
								<asp:CheckBox ID="TermsAndConditionsCheckBox" runat="server" />&nbsp;
								<asp:HyperLink ID="TermsAndConditionsHyperLink" runat="server" NavigateUrl="~/Checkout/TermsAndConditions.aspx"/>
								<asp:Label ID="TermsAndConditionsLabel" runat="server" Visible="false"/>
							</asp:PlaceHolder>
						</div>
					</td>
				</tr>
				<tr id="ContinueButtonTableRow" runat="server">
					<td class="continue-button-wrap">
						<asp:Button ID="ContinueButton" runat="server" OnClick="ContinueButton_OnClick" Visible="false" />
						<asp:Button ID="IndirectContinueButton" runat="server" OnClick="IndirectContinueButton_Click" Visible="false" />
                        <asp:ImageButton ID="OrdellPayPalImageButton" runat="server" ImageUrl="~/images/GTS/makepayment.jpg" OnClick="OrdellPayPalImageButton_Click" Visible="false" />
					</td>
				</tr>
			</table>
			</asp:Panel>
		</div>
	</div>
</asp:Content>