import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15';

import PatientsSummaryPanel from '../header/PatientsSummaryPanel';
import { themeConfigs } from '../../../../themes.config';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}
global.localStorage = new LocalStorageMock();

const testProps = {
  onCategorySelected: () => {},
  selectedCategory: {
    problems: true,
    contacts: true,
    allergies: true,
    medications: true,
  },
  feeds: [
    {
      name: 'NYTimes.com',
      landingPageUrl: 'https://www.nytimes.com/section/health',
      rssFeedUrl: 'http://rss.nytimes.com/services/xml/rss/nyt/Health.xml',
      sourceId: 'testSourceID6',
    }, {
      name: 'BBC Health',
      landingPageUrl: 'http://www.bbc.co.uk/news/health',
      rssFeedUrl: 'http://feeds.bbci.co.uk/news/health/rss.xml?edition=uk#',
      sourceId: 'testSourceID1',
    }, {
      name: 'NHS Choices',
      landingPageUrl: 'https://www.nhs.uk/news/',
      rssFeedUrl: 'https://www.nhs.uk/NHSChoices/shared/RSSFeedGenerator/RSSFeed.aspx?site=News',
      sourceId: 'testSourceID2',
    }, {
      name: 'Public Health',
      landingPageUrl: 'https://www.gov.uk/government/organisations/public-health-england',
      rssFeedUrl: 'https://www.gov.uk/government/organisations/public-health-england.atom',
      sourceId: 'testSourceID3',
    }, {
      name: 'Leeds Live - Whats on',
      landingPageUrl: 'https://www.leeds-live.co.uk/best-in-leeds/whats-on-news/',
      rssFeedUrl: 'https://www.leeds-live.co.uk/best-in-leeds/whats-on-news/?service=rss',
      sourceId: 'testSourceID4',
    }, {
      name: 'Leeds CC Local News',
      landingPageUrl: 'https://news.leeds.gov.uk',
      rssFeedUrl: 'https://news.leeds.gov.uk/tagfeed/en/tags/Leeds-news',
      sourceId: 'testSourceID5',
    },
  ],
};

configure({ adapter: new Adapter() });

describe('Component <PatientsSummaryPanel />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <PatientsSummaryPanel
        onCategorySelected={testProps.onCategorySelected}
        selectedCategory={testProps.selectedCategory}
        onViewOfBoardsSelected={() => {}}
        feeds={testProps.feeds}
      />).dive();
    expect(component).toMatchSnapshot();

    expect(component.instance().props.onCategorySelected).toEqual(testProps.onCategorySelected);
    expect(component.instance().props.selectedCategory).toEqual(testProps.selectedCategory);

    const expectedHeadingsNumber = themeConfigs.isLeedsPHRTheme ? 3 : 1;

    expect(component.find('.heading')).toHaveLength(expectedHeadingsNumber);
    expect(component.find('.form-group')).toHaveLength(expectedHeadingsNumber);

    expect(component.find('.heading').at(0).text()).toEqual('SHOW');
    if (themeConfigs.isLeedsPHRTheme) {
      expect(component.find('.heading').at(1).text()).toEqual('FEEDS');
      expect(component.find('.heading').at(2).text()).toEqual('VIEW OF BOARDS');
    } else {
      expect(component.find('PTCustomInput')).toHaveLength(4);
    }

    component.instance().toggleCheckbox('dashboard-name');
    component.setState({ selected: {
      problems: true,
      contacts: false,
      allergies: true,
      medications: false,
    } });
    component.setState({ selected: {
      problems: true,
      contacts: false,
      allergies: true,
      medications: false,
    } });

    component.instance().toggleRadio('test');

    component.setState({
      selectedViewOptions: {
        full: false,
        preview: true,
      },
    });

    component.setProps({
      patientsSummaryHasPreviewSettings: true,
    })
  });

  it('should renders with all props correctly with LeedsPHRTheme', () => {
    themeConfigs.isLeedsPHRTheme = true;
    const component = shallow(
      <PatientsSummaryPanel
        onCategorySelected={testProps.onCategorySelected}
        selectedCategory={testProps.selectedCategory}
        onViewOfBoardsSelected={() => {}}
        feeds={testProps.feeds}
      />).dive();

    expect(component).toMatchSnapshot();
  });
});
