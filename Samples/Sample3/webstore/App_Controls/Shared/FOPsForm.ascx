<%@ Control Language="C#" AutoEventWireup="true" Inherits="Gateway.Web.UI.Controls.FOPsForm" Codebehind="FOPsForm.ascx.cs" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ Register TagName="TicketBookInput" TagPrefix="cc1" Src="~/App_Controls/TicketBookInput.ascx" %>
<asp:PlaceHolder ID="JavaScriptPlaceHolder" runat="server" Visible="false">
	<script language="javascript" type="text/javascript">
		var _storePaymentCheckBoxClientID = '<%=StorePaymentCheckBox.ClientID%>';
		
        var _fOPsLabelClientID = '<%=FOPLabel.ClientID%>';
		var _fOPsDropDownListClientID = '<%=FOPsDropDownList.ClientID%>';

        var _cvvLabelClientID = '<%=CVVLabel.ClientID%>';
		var _cvvTextBoxClientID = '<%=CVVTextBox.ClientID%>';

        var _endorsementLabelClientID = '<%=EndorsementLabel.ClientID%>';
		var _endorsementTextBoxClientID = '<%=EndorsementTextBox.ClientID%>';

		var _cardExpirationDateLabelClientID = '<%=CardExpirationDateLabel.ClientID%>';
		var _cardExpirationMonthDropDownListClientID = '<%=CardExpirationMonthDropDownList.ClientID%>';
		
		var _cardExpirationYearDropDownListClientID = '<%=CardExpirationYearDropDownList.ClientID%>';
	</script>
</asp:PlaceHolder>
<div id="FOPsForm">

	<asp:PlaceHolder ID="PaymentOptionPlaceHolder" runat="server">
		<asp:RadioButton ID="PayByCreditCardRadioButton" runat="server" GroupName="PaymentOptionsRadioButtonGroup" Visible="false" AutoPostBack="true" OnCheckedChanged="PayByCreditCardRadioButton_CheckedChanged" /><br />
		<asp:RadioButton ID="PayByAccountRadioButton" runat="server" GroupName="PaymentOptionsRadioButtonGroup" Visible="false" AutoPostBack="true" OnCheckedChanged="PayByAccountRadioButton_CheckedChanged" /><br />
	</asp:PlaceHolder>

    <asp:PlaceHolder ID="CreditCardPlaceHolder" runat="server">
	    <div id="fop" class="fop-wrapper">
			<div class="fop-wrap store-payment">
                <div class="field wide">
            		<asp:CheckBox ID="StorePaymentCheckBox" runat="server" Visible="false" />
            		<asp:Literal ID="PaymentInformationLiteral" runat="server" />
                </div>
            </div>
	        <div class="fop-wrap payment-html">
                <div class="field wide">
					<cc1:HtmlContent ID="PaymentHtmlContent" Kind="Payment" runat="server" />
	            </div>
            </div>
		  <div class="fop-wrap fop-card-type">
	        <div class="label">
	            <asp:Label ID="FOPLabel" AssociatedControlID="FOPsDropDownList" runat="server" />
	        </div>
            <div class="field">
                <asp:DropDownList ID="FOPsDropDownList" runat="server" AutoPostBack="true" OnSelectedIndexChanged="FOPsDropDownList_SelectedIndexChanged" />
            </div>
          </div>
		   <div class="fop-wrap fop-card-number">
	        <div class="label">
	            <asp:Label ID="EndorsementLabel" AssociatedControlID="EndorsementTextBox" runat="server" />
	        </div>
            <div class="field">
                 <asp:TextBox ID="EndorsementTextBox" runat="server" MaxLength="16" autocomplete="off" />
                    <asp:CustomValidator ID="EndorsementFieldValidator" Display="Dynamic" runat="server" ControlToValidate="EndorsementTextBox" EnableClientScript="False" ValidateEmptyText="True" OnServerValidate="EndorsementFieldValidator_ServerValidate" />
            </div>
           </div>	
		   <div class="fop-wrap fop-card-expiration">
	        <div class="label">
	             <asp:Label ID="CardExpirationDateLabel" AssociatedControlID="CardExpirationMonthDropDownList" runat="server" />
	         </div>
            <div class="field">
                <asp:DropDownList ID="CardExpirationMonthDropDownList" runat="server">
					    <asp:ListItem Value="0" />
					    <asp:ListItem Value="1" />
					    <asp:ListItem Value="2" />
					    <asp:ListItem Value="3" />
					    <asp:ListItem Value="4" />
					    <asp:ListItem Value="5" />
					    <asp:ListItem Value="6" />
					    <asp:ListItem Value="7" />
					    <asp:ListItem Value="8" />
					    <asp:ListItem Value="9" />
					    <asp:ListItem Value="10" />
					    <asp:ListItem Value="11" />
					    <asp:ListItem Value="12" />
				    </asp:DropDownList>
				    <asp:DropDownList ID="CardExpirationYearDropDownList" runat="server">
					    <asp:ListItem Value="0" />
				    </asp:DropDownList>
            </div>
           </div>	
		   <div class="fop-wrap fop-cvv">
	        <div class="label">
	            <asp:Label ID="CVVLabel" AssociatedControlID="CVVTextBox" runat="server" />
	        </div>
            <div class="field">
                <asp:TextBox ID="CVVTextBox" MaxLength="4" runat="server" autocomplete="off" />
                    <asp:CustomValidator ID="CVVRequiredFieldValidator" runat="server" Display="Dynamic" ControlToValidate="CVVTextBox" EnableClientScript="False" ValidateEmptyText="True" OnServerValidate="CVVRequiredFieldValidator_ServerValidate" />
            </div>
           </div>	
			<div class="fop-wrap fop-cvv-info">
	        <div class="label">
	            &nbsp;
            </div>
            <div class="field">
                <asp:LinkButton ID="CVVInfoLinkButton" runat="server" OnClientClick="window.open('{0}','CVVDetails','menubar=no,scrollbars=yes,resizable=no,width=550,height=550');return false;" />
            </div>
           </div>	
			<div class="fop-wrap ticketbook">
                <div class="field wide">
		            <asp:PlaceHolder runat="server" ID="AlternateEndorsementPlaceHolder" Visible="false">
				        <cc1:TicketBookInput ID="TicketBookInputControl" runat="server" />
		            </asp:PlaceHolder>
                </div>
            </div>
			<div id="InclusivePONumberContainer" class="fop-wrap po-number" runat="server" visible="false">
				 <div class="label"><asp:Label ID="InclusivePONumberLabel" runat="server" /></div>
				 <div class="field"><asp:TextBox ID="InclusivePONumberTextBox" runat="server" MaxLength="20" /></div>
			</div>
		</div>
    </asp:PlaceHolder>

    <asp:PlaceHolder ID="AccountPlaceHolder" runat="server" Visible="false">
        <div id="po-account" class="po-wrapper">
            <div class="po-wrap">
                <div class="label"><asp:Label ID="ExclusivePONumberLabel" runat="server" Enabled="false" /></div>
                <div class="field">
                    <asp:TextBox ID="ExclusivePONumberTextBox" runat="server" Enabled="false" MaxLength="20" />
                </div>
            </div>
        </div>
    </asp:PlaceHolder>
    
    <asp:PlaceHolder ID="MaestroPlaceHolder" runat="server">
        <div id="maestro" class="maestro-wrapper">
            <div class="maestro-wrap maestro-issue-number">
                 <div class="label">
                    <asp:Label ID="IssueNoLabel" runat="server" />
                </div>
                <div class="field">
                    <asp:TextBox ID="IssueNoTextBox" runat="server" MaxLength="3" />
               </div>
            </div>

             <div class="maestro-wrap maestro-card">
                 <div class="label">
                    <asp:Label ID="CardStartDateLabel" runat="server" />
                </div>
                <div class="field">
					<asp:DropDownList ID="CardStartMonthDropDownList" runat="server">
                        <asp:ListItem Value="0" />
                        <asp:ListItem Value="1" />
                        <asp:ListItem Value="2" />
                        <asp:ListItem Value="3" />
                        <asp:ListItem Value="4" />
                        <asp:ListItem Value="5" />
                        <asp:ListItem Value="6" />
                        <asp:ListItem Value="7" />
                        <asp:ListItem Value="8" />
                        <asp:ListItem Value="9" />
                        <asp:ListItem Value="10" />
                        <asp:ListItem Value="11" />
                        <asp:ListItem Value="12" />
                    </asp:DropDownList>
                    <asp:DropDownList ID="CardStartYearDropDownList" runat="server">
                        <asp:ListItem Value="0" />
                    </asp:DropDownList>
                </div>
            </div>
        </div>
    </asp:PlaceHolder>
    <div class="edit-payment-button">
	    <asp:Button ID="EditButton" runat="server" Text="Edit Payment Information" OnClick="EditButton_Click" Visible="false" />
    </div>
</div>