# LPG Calculator - Multi-Page Refactoring Plan

## 🎯 Goal
Transform the single-page vertical scroll into a modern, multi-page flow with reusable components.

## 📱 Page Flow

```
┌─────────────────┐
│   Input Page    │  ← Enter all data (name, rates, quantities)
│                 │
│  [Calculate] →  │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  Results Page   │  ← View summary and totals
│                 │
│  [← Back]       │
│  [Generate PDF] │
└─────────────────┘
```

## 🏗️ Component Structure

```
src/
├── components/
│   ├── shared/
│   │   ├── Button.js          # Reusable button component
│   │   ├── Input.js            # Reusable input component
│   │   ├── Card.js             # Card container component
│   │   ├── Header.js           # Page header component
│   │   └── IconButton.js       # Icon button component
│   ├── cylinders/
│   │   ├── CylinderRow.js      # Single cylinder input row
│   │   └── CylinderList.js     # List of all cylinders
│   ├── custom/
│   │   ├── CustomFieldRow.js   # Custom field input row
│   │   └── CustomFieldsList.js # List of custom fields
│   ├── pages/
│   │   ├── InputPage.js        # Input form page
│   │   └── ResultsPage.js      # Results summary page
│   └── layout/
│       ├── Container.js        # Page container
│       └── Section.js          # Section wrapper
├── context/
│   └── CalculatorContext.js   # Shared state management
├── navigation/
│   └── AppNavigator.js         # Navigation setup
├── styles/
│   ├── theme.js                # Design system (colors, spacing)
│   └── typography.js           # Typography styles
└── utils/
    ├── formatters.js           # ✅ Already created
    └── validators.js           # ✅ Already created
```

## 🎨 Design System

### Colors
```javascript
const theme = {
  primary: '#2563eb',      // Blue
  secondary: '#10b981',    // Green
  danger: '#ef4444',       // Red
  warning: '#f59e0b',      // Orange
  background: '#f8fafc',   // Light gray
  card: '#ffffff',         // White
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
  },
  border: '#e2e8f0',
}
```

### Spacing
- Small: 8px
- Medium: 16px
- Large: 24px
- XLarge: 32px

### Typography
- H1: 28px, bold
- H2: 22px, semibold
- Body: 16px, regular
- Caption: 14px, regular

## 📄 Page Breakdown

### Page 1: Input Page
**Sections:**
1. Header (Title + Language switcher)
2. Customer Name Input (with icon)
3. Base Rate Input (11.80 kg) - Prominent card
4. Cylinder Inputs - Scrollable list in card
5. Custom Fields - Collapsible section
6. Calculate Button - Large, prominent

**Components:**
- `InputPage.js` (main container)
- `CustomerNameInput.js`
- `BaseRateCard.js`
- `CylinderList.js`
- `CustomFieldsSection.js`

### Page 2: Results Page
**Sections:**
1. Header (Title + Back button)
2. Customer Info Card
3. Summary Card (Total Weight + Total Amount) - Highlighted
4. Detailed Breakdown (all cylinders with totals)
5. Action Buttons (Back, Generate PDF)

**Components:**
- `ResultsPage.js` (main container)
- `SummaryCard.js`
- `BreakdownList.js`
- `ActionButtons.js`

## 🔄 State Management

**Option 1: Context API** (Recommended for this app)
```javascript
CalculatorContext.js
- customerName
- baseRate
- cylinders[]
- customFields[]
- totals{}
```

**Option 2: useReducer** (If state gets complex)
- Single reducer for all calculator state
- Actions: SET_BASE_RATE, UPDATE_CYLINDER, etc.

## 🚀 Implementation Steps

### Phase 1: Setup
1. ✅ Create folder structure
2. ✅ Create design system (theme.js)
3. ✅ Create shared components (Button, Input, Card)

### Phase 2: Components
4. ✅ Create CylinderRow component
5. ✅ Create InputPage component
6. ✅ Create ResultsPage component

### Phase 3: Navigation
7. ✅ Set up navigation between pages
8. ✅ Implement state management (Context)

### Phase 4: Polish
9. ✅ Add icons and animations
10. ✅ Improve styling
11. ✅ Test flow

## 📋 Component Specifications

### Shared Components

#### Button.js
```javascript
Props:
- title: string
- onPress: function
- variant: 'primary' | 'secondary' | 'danger'
- icon?: string
- disabled?: boolean
```

#### Input.js
```javascript
Props:
- label: string
- value: string
- onChangeText: function
- placeholder?: string
- keyboardType?: string
- icon?: string
- error?: string
```

#### Card.js
```javascript
Props:
- children: ReactNode
- title?: string
- style?: object
```

### CylinderRow.js
```javascript
Props:
- size: number (1, 5, 11.8, etc.)
- rate: number
- fare: number
- quantity: number
- total: number
- onFareChange: function
- onQuantityChange: function
```

## 🎯 Benefits

1. **Better UX**: Focus on one thing at a time
2. **Cleaner Code**: Reusable components
3. **Easier Maintenance**: Separated concerns
4. **Modern Design**: Card-based, clean layout
5. **Better Performance**: Smaller components, better optimization
6. **Scalability**: Easy to add more pages/features

## 🔄 Migration Strategy

1. Keep old App.js as backup
2. Create new components alongside
3. Test new flow thoroughly
4. Replace old implementation
5. Remove old code

