<%@ Control Language="C#" AutoEventWireup="true" Inherits="Gateway.Web.UI.Controls.CustContactsForm" Codebehind="CustContactsForm.ascx.cs" %>
<%@ Register Src="DateInput.ascx" TagName="DateInput" TagPrefix="uc1" %>

<div id="CustContactsForm">
    
    <div class="custcontact-wrapper" class="form-container">
        <div id="CustNameContainer" runat="server" class="wrap" visible="false">
            <div class="label" data-text="CustNameLabel"><asp:Label ID="CustNameLabel" runat="server" Enabled="false" /></div>
            <div class="field" data-el="CustNameTextBox"><asp:TextBox ID="CustNameTextBox" runat="server" Enabled="false" /></div>
        </div>
        
		<div id="NameTitleContainer" ClientIDMode="Static" class="wrap" runat="server">
			<div class="label" data-text="NameTitleLabel">
				<asp:Label ID="NameTitleLabel" AssociatedControlID="NameTitleDropDownList" runat="server" />
			</div>
			<div class="field">
				<div data-el="NameTitleTextBox"><asp:DropDownList ID="NameTitleDropDownList" runat="server" /></div>
                <div data-text="NameTitleFieldValidator"><asp:CustomValidator ID="NameTitleFieldValidator" runat="server"  
                Display="Dynamic" EnableClientScript="false" Enabled="false"
                ControlToValidate="NameTitleDropDownList" OnServerValidate="NameTitle_CustomValidator" /></div>
			</div>
		</div>
        
        <div class="name-wrap"><!-- Name wrap DIV  -->
		<div id="FirstNameContainer"  ClientIDMode="Static" class="wrap" runat="server">
			<div class="label" data-text="FirstNameLabel">
				<asp:Label ID="FirstNameLabel" AssociatedControlID="FirstNameTextBox" runat="server" />
			</div>
			<div class="field">
				<div data-el="FirstNameTextBox">
					<asp:TextBox ID="FirstNameTextBox" runat="server" CausesValidation="True" />
				</div>
				<div data-text="FirstNameFieldValidator">
					<asp:RequiredFieldValidator ID="FirstNameFieldValidator" runat="server" 
						ControlToValidate="FirstNameTextBox" Display="Dynamic" 
						EnableClientScript="False" />
				</div>
			</div>
		</div>
		<div id="MiddleNameContainer" ClientIDMode="Static" class="wrap" runat="server">
			<div class="label" data-text="MiddleNameLabel">
				<asp:Label ID="MiddleNameLabel" AssociatedControlID="MiddleNameTextBox" runat="server" />
			</div>
			<div class="field" data-el="MiddleNameTextBox">
				<asp:TextBox ID="MiddleNameTextBox" runat="server" CausesValidation="True" />
                <asp:RequiredFieldValidator ID="MiddleNameFieldValidator" runat="server" 
                    ControlToValidate="MiddleNameTextBox" Display="Dynamic" EnableClientScript="False" />
			</div>
		</div>
		<div id="LastNameContainer" ClientIDMode="Static" class="wrap" runat="server">
			<div class="label" data-text="LastNameLabel">
				<asp:Label ID="LastNameLabel" AssociatedControlID="LastNameTextBox" runat="server" />
			</div>
			<div class="field">
				<div data-el="LastNameTextBox">
					<asp:TextBox ID="LastNameTextBox" runat="server" CausesValidation="True" />
				</div>
				<div data-text="LastNameFieldValidator">
					<asp:RequiredFieldValidator ID="LastNameFieldValidator" runat="server" 
						ControlToValidate="LastNameTextBox" Display="Dynamic" 
						EnableClientScript="False" />
				</div>
			</div>
		</div>
            
        </div><!-- Name wrap DIV End -->
		<div  id="NameSuffixContainer" ClientIDMode="Static" class="wrap" runat="server">
			<div class="label" data-text="NameSuffixLabel">
				<asp:Label ID="NameSuffixLabel" AssociatedControlID="NameSuffixDropDownList" runat="server" />
			</div>
			<div class="field">
				<asp:DropDownList ID="NameSuffixDropDownList" runat="server" />
                <asp:CustomValidator ID="NameSuffixFieldValidator" runat="server"  
                Display="Dynamic" EnableClientScript="false" Enabled="false"
                ControlToValidate="NameSuffixDropDownList" OnServerValidate="NameSuffix_CustomValidator" />
			</div>
		</div>
        
        <div class="street-wrap"><!-- street wrap DIV  -->  
		<div id="Street1Container" ClientIDMode="Static" class="wrap" runat="server">
			<div class="label" data-text="Street1Label">
				<asp:Label ID="Street1Label" AssociatedControlID="Street1TextBox" runat="server" />
			</div>
			<div class="field">
				<div data-el="Street1TextBox">
					<asp:TextBox ID="Street1TextBox" runat="server" CausesValidation="True" />
				</div>
				<div data-text="Street1FieldValidator">
					<asp:RequiredFieldValidator ID="Street1FieldValidator" runat="server" 
                    ControlToValidate="Street1TextBox" Display="Dynamic" Enabled="false" EnableClientScript="False" />
				</div>
			</div>
		<div id="Street2Container" ClientIDMode="Static" class="wrap" runat="server">
		</div>
			<div class="label" data-text="Street2Label">
				<asp:Label ID="Street2Label" AssociatedControlID="Street2TextBox" runat="server" />
			</div>
			<div class="field">
				<div data-el="Street2TextBox">
				<asp:TextBox ID="Street2TextBox" runat="server" CausesValidation="True" />
				</div>
				<div data-text="Street2FieldValidator">
					<asp:RequiredFieldValidator ID="Street2FieldValidator" runat="server" 
                    ControlToValidate="Street2TextBox" Display="Dynamic" EnableClientScript="False" Enabled="false" />
			</div>
		</div>
            <div id="Street3Container" ClientIDMode="Static" class="wrap" visible="false" runat="server">
			<div class="label">
				<asp:Label ID="Street3Label" AssociatedControlID="Street3TextBox" runat="server" />
			</div>
			<div class="field">
				<asp:TextBox ID="Street3TextBox" runat="server" CausesValidation="True" />
				<asp:RequiredFieldValidator ID="Street3FieldValidator" runat="server" 
                    ControlToValidate="Street3TextBox" Display="Dynamic" EnableClientScript="False" Enabled="false" />
				</div>
			</div>
		</div>
        </div><!-- street wrap DIV End -->
    
        <div id="CountryContainer" ClientIDMode="Static" class="wrap" runat="server">
			<div class="label" data-text="CountryLabel">
				<asp:Label ID="CountryLabel" AssociatedControlID="CountryDropDownList" runat="server" />
			</div>
			<div class="field">
				<div data-sel="CountryDropDownList" >
					<asp:DropDownList ID="CountryDropDownList" runat="server" AutoPostBack="True" OnSelectedIndexChanged="CountryDropDownList_SelectedIndexChanged" />
				</div>
				<div data-text="CountryFieldValidator">
					<asp:RequiredFieldValidator ID="CountryFieldValidator" runat="server" 
						ControlToValidate="CountryDropDownList" Display="Dynamic" 
						EnableClientScript="False" />
				</div>
			</div>
		</div>
        
        <div class="address-wrap"><!-- address wrap DIV  -->
		<div id="CityContainer" ClientIDMode="Static" class="wrap" runat="server">
			<div class="label"  data-text="CityLabel">
				<asp:Label ID="CityLabel" AssociatedControlID="CityTextBox" runat="server" />
			</div>
			<div class="field">
				<div data-el="CityTextBox">
					<asp:TextBox ID="CityTextBox" runat="server" CausesValidation="True" />
				</div>
				<div data-text="CityFieldValidator">
					<asp:RequiredFieldValidator ID="CityFieldValidator" runat="server" 
                    ControlToValidate="CityTextBox" Display="Dynamic" Enabled="false" EnableClientScript="False" />
				</div>
			</div>
		</div>
		
		<div id="RegionContainer"  ClientIDMode="Static" class="wrap" runat="server">
			<div class="label" data-text="RegionLabel">
				<asp:Label ID="RegionLabel" runat="server" />
			</div>
			<div class="field">
				<div data-sel="RegionDropDownList">
					<asp:DropDownList ID="RegionDropDownList" runat="server" />
				</div>
				<div data-el="RegionTextBox">
					<asp:TextBox ID="RegionTextBox" runat="server" Width="225px" />
				</div>
				<div data-text="RegionFieldValidator">
					<asp:RequiredFieldValidator ID="RegionFieldValidator" runat="server"
					Display="Dynamic" EnableClientScript="False" Enabled="false" />
				</div>
			</div>
		</div>
		<div id="PostalContainer" ClientIDMode="Static" class="wrap" runat="server">
			<div class="label" data-text="PostalLabel">
				<asp:Label ID="PostalLabel" AssociatedControlID="PostalTextBox" runat="server" />
			</div>
			<div class="field">
				<div data-el="PostalTextBox">
					<asp:TextBox ID="PostalTextBox" runat="server" CausesValidation="True" />
				</div>
				<div data-text="PostalFieldValidator">
					<asp:RequiredFieldValidator ID="PostalFieldValidator" runat="server" 
                    ControlToValidate="PostalTextBox" Display="Dynamic" Enabled="false"
                    EnableClientScript="False" />
					<asp:CustomValidator ID="PostalRangeCustomValidator" runat="server"
						ControlToValidate="PostalTextBox" Display="Dynamic"
						EnableClientScript="false" Enabled="false" 
						onservervalidate="PostalRangeCustomValidator_ServerValidate" />
				</div>
			</div>
		</div>
        </div><!-- address wrap DIV End  -->
        
        <div class="tring-wrap"><!-- tring wrap DIV  -->
		    <div id="PhoneContainer"  ClientIDMode="Static" class="wrap" runat="server">
			<div class="label" data-text="PhoneLabel">
				    <asp:Label ID="PhoneLabel" AssociatedControlID="PhoneTextBox" runat="server" />
			    </div>
			    <div class="field">
				<div data-el="PhoneTextBox">
					<asp:TextBox ID="PhoneTextBox" runat="server" CausesValidation="True" />
				</div>
				<div data-text="PhoneFieldValidator">
					<asp:RequiredFieldValidator ID="PhoneFieldValidator" runat="server" 
                        ControlToValidate="PhoneTextBox" Display="Dynamic" Enabled="false" EnableClientScript="False" />
					<asp:RegularExpressionValidator ID="PhoneInputValidator" runat="server" 
						ControlToValidate="PhoneTextBox" Display="Dynamic"
                     ValidationExpression="^[-+()a-zA-Z0-9\s]*$" EnableClientScript="False" Enabled="false" ></asp:RegularExpressionValidator>
				</div>
			</div>
		</div>
		    <div id="CellContainer" ClientIDMode="Static" class="wrap" runat="server">
			<div class="label" data-text="CellLabel">
				    <asp:Label ID="CellLabel" AssociatedControlID="CellTextBox" runat="server" />
			    </div>
			    <div class="field">
				    <asp:TextBox ID="CellTextBox" runat="server" CausesValidation="True" />
				    <asp:Literal ID="CellMessageLiteral" runat="server" />
				<div data-text="CellFieldValidator">
					<asp:RequiredFieldValidator ID="CellFieldValidator" runat="server" Enabled="false"
						ControlToValidate="CellTextBox" Display="Dynamic" EnableClientScript="False" />
					<asp:RegularExpressionValidator ID="CellInputValidator" runat="server" 
						ControlToValidate="CellTextBox" Display="Dynamic"
					    ValidationExpression="^[-+()a-zA-Z0-9\s]*$" Enabled="false" EnableClientScript="False" />
				</div>
			</div>
		</div>
            
            <div id="FaxContainer" ClientIDMode="Static" class="wrap" runat="server" Visible="false">
			    <div class="label">
				    <asp:Label ID="FaxLabel" AssociatedControlID="FaxTextBox" runat="server" />
			    </div>
			    <div class="field">
				    <asp:TextBox ID="FaxTextBox" runat="server" CausesValidation="True" />
				    <asp:RequiredFieldValidator ID="FaxFieldValidator" runat="server" 
                        ControlToValidate="FaxTextBox" Display="Dynamic" Enabled="false" EnableClientScript="False" />
			    </div>
		    </div>
        </div><!-- tring wrap DIV End  -->
        <div class="email-wrap">
		    <div id="EmailContainer" ClientIDMode="Static" class="wrap" runat="server">
			<div class="label" data-text="EmailLabel">
				    <asp:Label ID="EmailLabel" AssociatedControlID="EmailTextBox" runat="server" />
			    </div>
			    <div class="field">
				<div data-el="EmailTextBox">
					<asp:TextBox ID="EmailTextBox" runat="server" Width="225px" CausesValidation="True" />
				</div>
				<div data-text="EmailFieldValidator">
					<asp:RequiredFieldValidator ID="EmailFieldValidator" runat="server" 
                        ControlToValidate="EmailTextBox" Display="Dynamic" Enabled="false" EnableClientScript="False" />
					<asp:RegularExpressionValidator ID="EmailFormatValidator" runat="server" ControlToValidate="EmailTextBox" 
					    ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" Display="Dynamic" Enabled="false"
						EnableClientScript="False" />
				</div>
			</div>
		    </div>
		    <div id="EmailConfirmContainer" ClientIDMode="Static" class="wrap" runat="server">
			<div class="label" data-text="EmailConfirmLabel">
				    <asp:Label ID="EmailConfirmLabel" AssociatedControlID="EmailConfirmTextBox" runat="server" />
			    </div>
			    <div class="field">
				    <asp:TextBox ID="EmailConfirmTextBox" runat="server" Width="225px" CausesValidation="True" />
				<div data-text="EmailConfirmFieldValidator">
					<asp:RequiredFieldValidator ID="EmailConfirmationValidator" runat="server" 
                        ControlToValidate="EmailConfirmTextBox" Display="Dynamic" Enabled="false"
						EnableClientScript="False" />
					<asp:CompareValidator ID="EmailComparisonValidator" runat="server" 
						ControlToCompare="EmailTextBox" ControlToValidate="EmailConfirmTextBox" 
                        ValueToCompare="Text" Display="Dynamic" Enabled="false" EnableClientScript="False" />&nbsp;
			    </div>
				</div>
			</div>
		</div>
        <div class="dob-wrap">
            <div id="DOBContainer" runat="server" ClientIDMode="Static"  class="wrap" visible="false">
            <div class="label" data-text="DOBLabel">
                    <asp:Label ID="DOBLabel" AssociatedControlID="DOBDateInput" runat="server" />
                </div>
                <div class="field">
                    <uc1:DateInput ID="DOBDateInput" runat="server" Enabled="false" ValidatorEnabled="true" />
                </div>
            </div>
        </div>
        <div  id="GenderContainer" ClientIDMode="Static" class="wrap" runat="server" Visible="false">
			<div class="label">
				<asp:Label ID="GenderLabel" AssociatedControlID="GenderDropDownList" CausesValidation="True" runat="server" />
			</div>
			<div class="field">
				<asp:DropDownList ID="GenderDropDownList" runat="server" />
                <asp:CustomValidator ID="GenderCustomValidator" runat="server"  Display="Dynamic" EnableClientScript="false" Enabled="false"
                ControlToValidate="GenderDropDownList" OnServerValidate="Gender_CustomValidator" />
			</div>
		</div>
       
        <div id="JobTitleContainer" ClientIDMode="Static" class="wrap" runat="server" Visible="false">
			<div class="label">
				<asp:Label ID="JobTitleLabel" AssociatedControlID="JobTitleTextBox" runat="server" />
			</div>
			<div class="field">
				<asp:TextBox ID="JobTitleTextBox" runat="server" CausesValidation="True" />
				<asp:RequiredFieldValidator ID="JobTitleFieldValidator" runat="server" 
                    ControlToValidate="JobTitleTextBox" Display="Dynamic" Enabled="false" EnableClientScript="False" />
			</div>
		</div>
	</div>

</div>