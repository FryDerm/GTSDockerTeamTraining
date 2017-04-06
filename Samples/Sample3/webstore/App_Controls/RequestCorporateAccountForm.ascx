<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="RequestCorporateAccountForm.ascx.cs" Inherits="Gateway.WebStore.App_Controls.RequestCorporateAccountForm" %>

<div id="RequestCorporateAccountForm">

    <table>
        <tr>
            <td ID="BusinessInfoHeader" colspan="2" data-text="businessInfoHeader">
                <asp:Label ID="BusinessInfoLabel" runat="server" />
            </td>
        </tr>
        <tr>
            <td colspan="2">&nbsp;</td>
        </tr>
        <tr id="BusinessNameRow" ClientIDMode="Static" runat="server">
            <td data-text="businessNameLabel"><asp:Label ID="BusinessNameLabel" runat="server" /></td>
            <td>
                <span data-el="businessName">
                    <asp:TextBox ID="BusinessNameTextBox" runat="server" />
                </span>
        		<span data-text="businessNameError"><asp:RequiredFieldValidator ID="BusinessNameFieldValidator" runat="server" 
                    ControlToValidate="BusinessNameTextBox" Display="Dynamic" 
                    EnableClientScript="False" Enabled="true" /></span>
				<span data-el="businessNameRequired"><asp:HiddenField runat="server" ID="BusinessNameRequired"/></span>
            </td>
        </tr>
         <tr id="BusinessReferenceRow" ClientIDMode="Static" runat="server">
			<td>
				<asp:Label ID="BusinessReferenceLabel"  AssociatedControlID="BusinessReferenceTextBox" runat="server" />
			</td>
			<td>
			    <span data-el="businessReference">
				    <asp:TextBox ID="BusinessReferenceTextBox" runat="server" CausesValidation="True" /></span>
                <span data-text="businessReferenceError">
				<asp:RequiredFieldValidator ID="BusinessReferenceFieldValidator" runat="server" 
                    ControlToValidate="BusinessReferenceTextBox" Display="Dynamic" 
                    EnableClientScript="False" Enabled="false"  /></span>
				<span data-el="businessReferenceRequired"><asp:HiddenField runat="server" ID="BusinessReferenceRequired"/></span>
			</td>
		</tr>
         <tr id="ExternalAccountRow" ClientIDMode="Static" runat="server">
			<td>
				<asp:Label ID="ExternalAccountLabel" AssociatedControlID="ExternalAccountTextBox" runat="server" />
			</td>
			<td>
			    <span data-el="externalAccount">
				    <asp:TextBox ID="ExternalAccountTextBox" runat="server" CausesValidation="True" />
                </span>
                <span data-text="externalAccountError">
				    <asp:RequiredFieldValidator ID="ExternalAccountFieldValidator" runat="server" 
                        ControlToValidate="ExternalAccountTextBox" Display="Dynamic" 
                        EnableClientScript="False" Enabled="false"  />
					<span data-el="externalAccountRequired"><asp:HiddenField runat="server" ID="ExternalAccountRequired"/></span>
                </span>
			</td>
		</tr>
         <tr id="SalespersonRow" ClientIDMode="Static" runat="server">
			<td>
				<asp:Label ID="SalespersonLabel" AssociatedControlID="SalespersonTextBox" runat="server" />
			</td>
			<td>
				<span data-el="salesperson"><asp:TextBox ID="SalespersonTextBox" runat="server" CausesValidation="True" /></span>
				<span data-text="salespersonError"><asp:RequiredFieldValidator ID="SalespersonFieldValidator" runat="server" 
                    ControlToValidate="SalespersonTextBox" Display="Dynamic" 
                    EnableClientScript="False" Enabled="false"  /></span>
				<span data-el="salespersonRequired"><asp:HiddenField runat="server" ID="SalespersonRequired"/></span>
			</td>
		</tr>
        
        <tr id="GroupSalesCodeRow" ClientIDMode="Static" runat="server">
			<td>
				<asp:Label ID="GroupSalesCodeLabel" AssociatedControlID="GroupSalesCodeTextBox" runat="server" />
			</td>
			<td>
				<span data-el="groupSalesCode"><asp:TextBox ID="GroupSalesCodeTextBox" runat="server" CausesValidation="True" /></span>
				<span data-text="groupSalesCodeError"><asp:RequiredFieldValidator ID="GroupSalesCodeFieldValidator" runat="server" 
                    ControlToValidate="GroupSalesCodeTextBox" Display="Dynamic" 
                    EnableClientScript="False" Enabled="false"  /></span>
				<span data-el="groupSalesCodeRequired"><asp:HiddenField runat="server" ID="GroupSalesCodeRequired"/></span>
			</td>
		</tr>
        <tr id="BusinessPhoneRow" ClientIDMode="Static" runat="server">
			<td>
				<asp:Label ID="BusinessPhoneLabel" AssociatedControlID="BusinessPhoneTextBox" runat="server" />
			</td>
			<td>
				<span data-el="businessPhone"><asp:TextBox ID="BusinessPhoneTextBox" runat="server" CausesValidation="True" /></span>
				<span data-text="businessPhoneError"><asp:RequiredFieldValidator ID="BusinessPhoneFieldValidator" runat="server" 
                    ControlToValidate="BusinessPhoneTextBox" Display="Dynamic" 
                    EnableClientScript="False" Enabled="false"  /></span>
				<span data-el="businessPhoneRequired"><asp:HiddenField runat="server" ID="BusinessPhoneRequired"/></span>
			</td>
		</tr>
         <tr id="BusinessMobileRow" ClientIDMode="Static" runat="server">
			<td>
				<asp:Label ID="BusinessMobileLabel" Text="Mobile" AssociatedControlID="BusinessMobileTextBox" runat="server" />
			</td>
			<td>
			    <span data-el="businessMobile">
				<asp:TextBox ID="BusinessMobileTextBox" runat="server" CausesValidation="True" /></span>
                <span data-text="businessMobileError">
				<asp:RequiredFieldValidator ID="BusinessMobileFieldValidator" runat="server" 
                    ControlToValidate="BusinessMobileTextBox" Display="Dynamic" 
                    EnableClientScript="False" Enabled="false"  /></span>
				<span data-el="businessMobileRequired"><asp:HiddenField runat="server" ID="BusinessMobileRequired"/></span>
			</td>
		</tr>
        <tr id="BusinessFaxRow" ClientIDMode="Static" runat="server">
			<td>
				<asp:Label ID="BusinessFaxLabel" AssociatedControlID="BusinessFaxTextBox" runat="server" />
			</td>
			<td>
				<span data-el="businessFax"><asp:TextBox ID="BusinessFaxTextBox" runat="server" CausesValidation="True" /></span>
				<span data-el="businessFaxError"><asp:RequiredFieldValidator ID="BusinessFaxFieldValidator" runat="server" 
                    ControlToValidate="BusinessFaxTextBox" Display="Dynamic" 
                    EnableClientScript="False" Enabled="false"  /></span>
				<span data-el="businessFaxRequired"><asp:HiddenField runat="server" ID="BusinessFaxRequired"/></span>
			</td>
		</tr>
        <tr id="BusinessStreet1Row" ClientIDMode="Static" runat="server">
            <td data-text="businessStreet1Label">
            	<asp:Label ID="BusinessStreet1Label"  AssociatedControlID="BusinessStreet1TextBox" runat="server" />
			</td>
			<td>
                <span data-el="businessStreet1">
				<asp:TextBox ID="BusinessStreet1TextBox" runat="server" CausesValidation="True" />
                    </span>
				<span data-text="businessStreet1Error"><asp:RequiredFieldValidator ID="BusinessStreet1FieldValidator" runat="server" 
                    ControlToValidate="BusinessStreet1TextBox" Display="Dynamic" 
                    EnableClientScript="False" Enabled="false"  /></span>
				<span data-el="businessStreet1Required"><asp:HiddenField runat="server" ID="BusinessStreet1Required"/></span>
			</td>
		</tr>

		<tr id="BusinessStreet2Row" ClientIDMode="Static" runat="server">
			<td data-text="businessStreet2Label">
				<asp:Label ID="BusinessStreet2Label" AssociatedControlID="BusinessStreet2TextBox" runat="server" />
			</td>
			<td>
                    <span data-el="businessStreet2">
				<asp:TextBox ID="BusinessStreet2TextBox" runat="server" />
                        </span>
				<span data-text="businessStreet2Error"><asp:RequiredFieldValidator ID="BusinessStreet2FieldValidator" runat="server" 
                    ControlToValidate="BusinessStreet2TextBox" Display="Dynamic" 
                    EnableClientScript="False" Enabled="false" /></span>
				<span data-el="businessStreet2Required"><asp:HiddenField runat="server" ID="BusinessStreet2Required"/></span>
			</td>
		</tr>
        
		<tr>
			<td data-text="businessCityLabel">
				<asp:Label ID="BusinessCityLabel" AssociatedControlID="BusinessCityTextBox" runat="server" />
			</td>
			<td>
                
				<span data-el="businessCity"><asp:TextBox ID="BusinessCityTextBox" runat="server" CausesValidation="True" /></span>
				<span data-text="businessCityError"><asp:RequiredFieldValidator ID="BusinessCityFieldValidator" runat="server" 
                    ControlToValidate="BusinessCityTextBox" Display="Dynamic" EnableClientScript="False" Enabled="false" /></span>
				<span data-el="businessCityRequired"><asp:HiddenField runat="server" ID="BusinessCityRequired"/></span>
			</td>
		</tr>
        
   		<tr>
			<td data-text="businessCountryLabel">
				<asp:Label ID="BusinessCountryLabel" AssociatedControlID="BusinessCountryDropDownList" runat="server" />
			</td>
			<td>
				<span data-html="businessCountry"><asp:DropDownList ID="BusinessCountryDropDownList" runat="server" AutoPostBack="True" OnSelectedIndexChanged="BusinessCountryDropDownList_SelectedIndexChanged" /></span>
				<span data-text="businessCountryError"><asp:RequiredFieldValidator ID="BusinessCountryFieldValidator" runat="server" 
                    ControlToValidate="BusinessCountryDropDownList" Display="Dynamic" EnableClientScript="False" Enabled="false" /></span>		
				<span data-el="businessCountryRequired"><asp:HiddenField runat="server" ID="BusinessCountryRequired"/></span>
            </td>
		</tr>
       
 		<tr>
			<td data-text="businessStateLabel">
				<asp:Label ID="BusinessRegionLabel" runat="server" />
			</td>
			<td>
				<span data-html="businessStates"><asp:DropDownList ID="BusinessRegionDropDownList" runat="server" /></span>
				<span data-el="businessState"><asp:TextBox ID="BusinessRegionTextBox" runat="server" Width="225px" /></span>
				<span data-text="businessStatesError"><asp:RequiredFieldValidator ID="BusinessRegionFieldValidator" runat="server"
					Display="Dynamic" EnableClientScript="False" Enabled="false" /></span>
				<span data-el="businessStateRequired"><asp:HiddenField runat="server" ID="BusinessStateRequired"/></span>
		    </td>
		</tr>
        
		<tr>
			<td data-text="businessZipcodeLabel">
				<asp:Label ID="BusinessPostalLabel" AssociatedControlID="BusinessPostalTextBox" runat="server" />
			</td>
			<td>
				<span data-el="businessZipcode"><asp:TextBox ID="BusinessPostalTextBox" runat="server" CausesValidation="True" /></span>
				<span data-text="businessZipcodeError"><asp:RequiredFieldValidator ID="BusinessPostalFieldValidator" runat="server" 
                    ControlToValidate="BusinessPostalTextBox" Display="Dynamic" EnableClientScript="False" Enabled="false" /></span>
				<span data-el="businessPostalRequired"><asp:HiddenField runat="server" ID="BusinessPostalRequired"/></span>
			</td>
		</tr>
                
		<tr>
			<td data-text="businessUrlLabel">
				<asp:Label ID="BusinessURLLabel" AssociatedControlID="BusinessURLTextBox" runat="server" />
			</td>
			<td>
				<span data-el="businessUrl"><asp:TextBox ID="BusinessURLTextBox" runat="server" Width="225px" CausesValidation="True" /></span>
				<span data-text="businessUrlError"><asp:RequiredFieldValidator ID="BusinessURLFieldValidator" runat="server" 
                    ControlToValidate="BusinessURLTextBox" Display="Dynamic" EnableClientScript="False" Enabled="false" /></span>
				<span data-el="businessURLRequired"><asp:HiddenField runat="server" ID="BusinessURLRequired"/></span>
			</td>
		</tr>
        
        <tr>
            <td colspan="2"><hr /></td>
        </tr>                
        
        <tr>
            <td ID="ContactInfoHeader" colspan="2" data-text="contactInfoHeader">
                <asp:Label ID="ContactInfoLabel" runat="server" />
            </td>
        </tr>
        <tr>
            <td colspan="2">&nbsp;</td>
        </tr>
   		
   		<tr>
			<td data-text="firstNameLabel">
				<asp:Label ID="FirstNameLabel" AssociatedControlID="FirstNameTextBox" runat="server" />
			</td>
			<td>
				<span data-el="firstName"><asp:TextBox ID="FirstNameTextBox" runat="server" CausesValidation="True" /></span>
				<span data-text="firstNameError"><asp:RequiredFieldValidator ID="FirstNameFieldValidator" runat="server" 
                    ControlToValidate="FirstNameTextBox" Display="Dynamic" 
                    EnableClientScript="False" Enabled="true" /></span>
			</td>
		</tr>
		<tr id="MiddleNameTableRow" runat="server">
			<td data-text="middleNameLabel">
				<asp:Label ID="MiddleNameLabel" AssociatedControlID="MiddleNameTextBox" runat="server" />
			</td>
			<td>
				<span data-el="middleName"><asp:TextBox ID="MiddleNameTextBox" runat="server" /></span>
				<span data-el="middleNameError"><asp:RequiredFieldValidator ID="MiddleNameFieldValidator" runat="server" 
                    ControlToValidate="MiddleNameTextBox" Display="Dynamic" 
                    EnableClientScript="False" Enabled="false" /></span>
			</td>
		</tr>
		<tr>
			<td data-text="lastNameLabel">
				<asp:Label ID="LastNameLabel" AssociatedControlID="LastNameTextBox" runat="server" />
			</td>
			<td>
				<span data-el="lastName"><asp:TextBox ID="LastNameTextBox" runat="server" CausesValidation="True" /></span>
				<span data-text="lastNameError"><asp:RequiredFieldValidator ID="LastNameFieldValidator" runat="server" 
                    ControlToValidate="LastNameTextBox" Display="Dynamic" 
                    EnableClientScript="False" Enabled="true" /></span>
			</td>
		</tr>

        <tr>
            <td colspan="2" data-text="useBusinessAddressLabel">
                <asp:Button ID="UseBusinessAddressButton" runat="server" OnClick="UseBusinessAddressButton_Click" />
            </td>
        </tr>

   		<tr>
			<td data-text="contactStreet1Label">
				<asp:Label ID="Street1Label" AssociatedControlID="Street1TextBox" runat="server" />
			</td>
			<td>
				<span data-el="contactStreet1"><asp:TextBox ID="Street1TextBox" runat="server" CausesValidation="True" /></span>
				<span data-text="contactStreet1Error"><asp:RequiredFieldValidator ID="Street1FieldValidator" runat="server" 
                    ControlToValidate="Street1TextBox" Display="Dynamic" 
                    EnableClientScript="False" Enabled="false"  /></span>
			</td>
		</tr>
		<tr>
			<td data-text="contactStreet2Label">
				<asp:Label ID="Street2Label" AssociatedControlID="Street2TextBox" runat="server" />
			</td>
			<td>
				<span data-el="contactStreet2"><asp:TextBox ID="Street2TextBox" runat="server" /></span>
				<span data-text="contactStreet2Error"><asp:RequiredFieldValidator ID="Street2FieldValidator" runat="server" 
                    ControlToValidate="Street2TextBox" Display="Dynamic" 
                    EnableClientScript="False" Enabled="false" /></span>
			</td>
		</tr>
		<tr>
			<td data-text="contactCityLabel">
				<asp:Label ID="CityLabel" AssociatedControlID="CityTextBox" runat="server" />
			</td>
			<td>
				<span data-el="contactCity"><asp:TextBox ID="CityTextBox" runat="server" CausesValidation="True" /></span>
				<span data-text="contactCityError"><asp:RequiredFieldValidator ID="CityFieldValidator" runat="server" 
                    ControlToValidate="CityTextBox" Display="Dynamic" EnableClientScript="False" Enabled="false" /></span>
			</td>
		</tr>
		<tr>
			<td data-text="contactCountryLabel">
				<asp:Label ID="CountryLabel" AssociatedControlID="CountryDropDownList" runat="server" />
			</td>
			<td>
				<span data-html="contactCountry"><asp:DropDownList ID="CountryDropDownList" runat="server" AutoPostBack="True" OnSelectedIndexChanged="CountryDropDownList_SelectedIndexChanged" /></span>
				<span data-text="contactCountryError"><asp:RequiredFieldValidator ID="CountryFieldValidator" runat="server" 
                    ControlToValidate="CountryDropDownList" Display="Dynamic" EnableClientScript="False" Enabled="false" /></span>			
            </td>
		</tr>
		<tr>
			<td data-text="contactStateLabel">
				<asp:Label ID="RegionLabel" runat="server" />
			</td>
			<td>
				<span data-html="contactStates"><asp:DropDownList ID="RegionDropDownList" runat="server" /></span>
				<span data-el="contactState"><asp:TextBox ID="RegionTextBox" runat="server" Width="225px" /></span>
				<span data-el="contactStatesError"><asp:RequiredFieldValidator ID="RegionFieldValidator" runat="server"
					Display="Dynamic" EnableClientScript="False" Enabled="false" /></span>
		    </td>
		</tr>
		<tr>
			<td data-text="contactZipcodeLabel">
				<asp:Label ID="PostalLabel" AssociatedControlID="PostalTextBox" runat="server" />
			</td>
			<td>
				<span data-el="contactZipcode"><asp:TextBox ID="PostalTextBox" runat="server" CausesValidation="True" /></span>
				<span data-text="contactZipcodeError"><asp:RequiredFieldValidator ID="PostalFieldValidator" runat="server" 
                    ControlToValidate="PostalTextBox" Display="Dynamic" EnableClientScript="False" Enabled="false" /></span>
			</td>
		</tr>
		<tr>
			<td data-text="contactPhoneLabel">
				<asp:Label ID="PhoneLabel" AssociatedControlID="PhoneTextBox" runat="server" />
			</td>
			<td>
				<span data-el="contactPhone"><asp:TextBox ID="PhoneTextBox" runat="server" CausesValidation="True" /></span>
				<span data-text="contactPhoneError"><asp:RequiredFieldValidator ID="PhoneFieldValidator" runat="server" 
                    ControlToValidate="PhoneTextBox" Display="Dynamic" EnableClientScript="False" Enabled="false" />
                <asp:RegularExpressionValidator ID="PhoneInputValidator" runat="server" 
                    ControlToValidate="PhoneTextBox" Display="Dynamic"
                 ValidationExpression="^[-+()a-zA-Z0-9\s]*$" EnableClientScript="False" Enabled="false" /></span>

			</td>
		</tr>
		<tr id="EmailTableRow" runat="server">
			<td data-text="contactEmailLabel">
				<asp:Label ID="EmailLabel" AssociatedControlID="EmailTextBox" runat="server" />
			</td>
			<td>
				<span data-el="contactEmail"><asp:TextBox ID="EmailTextBox" runat="server" Width="225px" CausesValidation="True" /></span>
				<span data-text="contactEmailError"><asp:RequiredFieldValidator ID="EmailFieldValidator" runat="server" 
                    ControlToValidate="EmailTextBox" Display="Dynamic" EnableClientScript="False" Enabled="true" />
				<asp:RegularExpressionValidator ID="EmailFormatValidator" runat="server" ControlToValidate="EmailTextBox" 
					ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" Display="Dynamic" 
                    EnableClientScript="False" /></span>
            </td>
		</tr>
		<tr id="EmailConfirmTableRow" runat="server">
			<td data-text="contactConfirmEmailLabel">
				<asp:Label ID="EmailConfirmLabel" AssociatedControlID="EmailConfirmTextBox" runat="server" />
			</td>
			<td>
				<span data-el="contactConfirmEmail"><asp:TextBox ID="EmailConfirmTextBox" runat="server" Width="225px" CausesValidation="True" /></span>
				<span data-text="contactConfirmEmailError"><asp:RequiredFieldValidator ID="EmailConfirmationValidator" runat="server" 
                    ControlToValidate="EmailConfirmTextBox" Display="Dynamic" EnableClientScript="False" Enabled="true" />
				<asp:CompareValidator ID="EmailComparisonValidator" runat="server" 
                    ControlToCompare="EmailTextBox" ControlToValidate="EmailConfirmTextBox" 
                    ValueToCompare="Text" Display="Dynamic" EnableClientScript="False" Enabled="true" /></span>
			</td>
		</tr>

    </table>
</div>