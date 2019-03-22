import * as React from "react"
import { PropertyControls, ControlType, Frame, Size } from "framer"
import styled from "styled-components"

interface Props extends Size {
  padding: number
  paddingPerSide: boolean
  paddingTop: number
  paddingRight: number
  paddingBottom: number
  paddingLeft: number
  backgroundColor: string
  fontSize: number
  borderRadius: number
  searchColor: string
  resultColor: string
  selectColor: string
  selectBackground: string
  resultSpacing: number
  resultLength: number
  value: string
  placeholder: string
}

type State = {
  value: string
  valueFromProps: string
  query: string
  results: any
  selected: string
  hasFocus: boolean
  focused: number
}

export class LocationLookup extends React.Component<Partial<Props>, State> {

  state = {
    value: this.props.value,
    valueFromProps: this.props.value,
    query: "",
    results: [],
    selected: "",
    hasFocus: false,
    focused: -1,
  }

  searchInput = React.createRef()

  static defaultProps: Props = {
    width: 320,
    height: 56,
    padding: 16,
    paddingPerSide: true,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 56,
    backgroundColor: "#FFF",
    fontSize: 16,
    borderRadius: 4,
    searchColor: "#333",
    resultColor: "#333",
    selectColor: "#1199EE",
    selectBackground: "rgba(0,0,0,0.05)",
    resultSpacing: 16,
    resultLength: 5,
    value: "Singel 3",
    placeholder: "Zoek op gemeente, woonplaats, adres of postcode",
  }

  static propertyControls: PropertyControls<Props> = {
    value: { type: ControlType.String, title: "Value" },
    placeholder: { type: ControlType.String, title: "Placeholder" },
    padding: {
      type: ControlType.FusedNumber,
      toggleKey: "paddingPerSide",
      toggleTitles: ["All Sides", "Per Side"],
      valueKeys: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
      valueLabels: ["T", "R", "B", "L"],
      min: 0,
      title: "Input padding"
    },
    backgroundColor: { type: ControlType.Color, title: "Background" },
    searchColor: {type: ControlType.Color, title: "Search Color"},
    resultColor: {type: ControlType.Color, title: "Result Color"},
    selectColor: {type: ControlType.Color, title: "Select Color"},
    selectBackground: {type: ControlType.Color, title: "Select Background"},
    fontSize: { type: ControlType.Number, title: "Font Size", min: 5, max: 25 },
    borderRadius: { type: ControlType.Number, title: "Radius", min: 0, max: 50 },
    resultSpacing: { type: ControlType.Number, title: "Spacing" },
    resultLength: { type: ControlType.Number, title: "Max amount", min: 1, max: 10 },
  }

  xhttp?: XMLHttpRequest

  loadData = (url, callback) => {
    if (this.xhttp) {
      this.xhttp.abort()
    }
    const xhttp = (this.xhttp = new XMLHttpRequest())
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        const response = JSON.parse(xhttp.responseText)
        callback(response)
      }
    }
    xhttp.open("GET", url, true)
    xhttp.send()
  }

  componentWillMount() {
    const {value} = this.props
    if (value) {
      this.autoSuggest(this.props.value)
      this.setState({...this.state, focused: 0})
    }
  }

  componentWillUnmount() {
    if (this.xhttp) {
      this.xhttp.abort()
    }
  }

  autoSuggest = (key) => {
    const pdok = `https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?rows=${this.props.resultLength}&q=`
    const url = pdok + key
    this.loadData(url,data => {
      this.setState({...this.state, query: key, results: data.response.docs, hasFocus: true})
    })
  }

  handleChange = (e) => {
    this.autoSuggest(e.target.value)
    this.setState({value: e.target.value})
  }

  selectSuggestion = (e,selection) => {
    e.preventDefault()
    this.setSuggestion(selection)
  }

  setSuggestion = (selection) => {
    this.searchInput.current.value = selection
    this.setState({...this.state, selected: selection, results: []})
  }

  handleKeyDown = (e) => {
    const { results, focused } = this.state
    const length = results.length
    // Arrow down, next result
    if (e.keyCode === 40 || e.keyCode === 9) {
      e.preventDefault()
      if (focused < length - 1) {
        this.setState(prevState => {
          return {...this.state, focused: prevState.focused + 1}
        })
      }
    }
    // Arrow up, previous result
    else if (e.keyCode === 38) {
      e.preventDefault()
      if (focused > 0) {
        this.setState(prevState => {
          return {...this.state, focused: prevState.focused - 1}
        })
      }
    }
    // Enter, select suggestion
    else if (e.keyCode === 13) {
      this.setSuggestion(results[focused].weergavenaam)
    } else {
      this.setState({...this.state, focused: -1})
    }
  }

  handleOnFocus = (e, index) => {
    e.preventDefault()
    this.setState({...this.state, focused: index})
  }

  render() {
    const { results, query, hasFocus, focused, selected, value } = this.state
    const {
      paddingPerSide,
      padding,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      backgroundColor,
      fontSize,
      borderRadius,
      searchColor,
      resultColor,
      selectColor,
      selectBackground,
      resultSpacing,
      resultLength,
      placeholder
    } = this.props
    const paddingValue = paddingPerSide
      ? `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`
      : `${padding}px`;
    const { width, height } = this.props
    const hasResults = results.length > 0
    const hasText = query.length > 0
    const showResults = hasText && hasResults

    return (
      <Frame
        width={width}
        overflow={"visible"}
        style={{
          backgroundColor: "transparent",
          overflow: "visible"
        }}
      >
        <SearchInput
          type="text"
          value={value}
          placeholder = {placeholder}
          onChange = {(e) => this.handleChange(e)}
          width = {width}
          height = {height}
          padding = {paddingValue}
          backgroundColor = {backgroundColor}
          fontSize = {fontSize}
          borderRadius = {borderRadius}
          searchColor = {searchColor}
          onKeyDown = {this.handleKeyDown}
          ref= {this.searchInput}
        />
          <ResultList
            opacity = {showResults ? 1 : 0}
            visibility = {showResults ? "visible" : "hidden"}
            fontSize = {fontSize}
            marginTop = {resultSpacing}
            borderRadius = {borderRadius}
            backgroundColor = {backgroundColor}
            resultColor = {resultColor}
            selectColor = {selectColor}
            selectBackground = {selectBackground}
            height = {resultLength * 64 + 16}
          >
            {results.map((result,index) => (
              <li
                key={index}
              >
                <a
                  href=""
                  onClick={(e) => this.selectSuggestion(e, result.weergavenaam)}
                  className={index === focused ? "isFocused" : ""}
                  onMouseOver={(e) => this.handleOnFocus(e, index)}
                >
                <p><strong>{result.weergavenaam}</strong></p>
                <p>{result.type}</p>
                </a>
              </li>
            ))}
          </ResultList>
      </Frame>
    )
  } 
}

const SearchInput = styled.input`
  border: 1px solid #DDD;
  outline: none;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  padding: ${props => props.padding};
  background-color: ${props => props.backgroundColor};
  font-size: ${props => props.fontSize}px;
  line-height: 1.5;
  border-radius: ${props => props.borderRadius}px;
  color: ${props => props.searchColor};
  outline: none;    
  -webkit-appearance: none;
  -moz-appearance: none;
  &:focus {
    border-color: #AAA;
  }
`

const ResultList = styled.ul`
  opacity: ${props => props.opacity};
  visibility: ${props => props.visibility};
  list-style: none;
  margin: ${props => props.marginTop}px 0 0 0;
  padding: 8px;
  border-radius: ${props => props.borderRadius}px;
  overflow: scroll;
  height: ${props => props.length * 64}px;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.resultColor};
  border: 1px solid #CCC;
  li {
    padding: 0;
    a {
      font-size: ${props => props.fontSize}px;
      line-height: 1.5;
      width: auto;
      height: 100%;
      padding: 8px 12px;
      display: block;
      background-color: white;
      text-decoration: none;
      border-radius: 2px;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      &.isFocused, &:active {
        background-color: ${props => props.selectBackground};
        color: ${props => props.selectColor} !important;
      }
      &:visited {
        color: inherit;
        text-decoration: inherit;
      }
      p {
        margin: 0;
      }
    }
  }
`