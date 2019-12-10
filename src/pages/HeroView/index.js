import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert
} from 'react-native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';
import { deleteHero } from '~/controllers/HeroController';

class HeroView extends Component {

  constructor(props) {
    super(props);
    this.state = {
        hero: this.props.hero,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ hero: nextProps.hero });
  }

  goToScreenUpdateHero = () => {
    if (!this.state.hero || !this.props.navigation)
        return;

    const { navigate } = this.props.navigation;
    navigate('UpdateHero', { hero: this.state.hero.clone(), event: this.props.event })
  }

  deleteHero = () => {
    if (!this.state.hero)
        return;

    let deleteHeroMsg = deleteHero(this.state.hero);
    Alert.alert('Message', deleteHeroMsg.message);

    if (deleteHeroMsg.result) {
        if (this.props.event)
            this.props.event.emit('onDeleteHero');
    }
  }

  render() {
    if (!this.state.hero)
        return <Text style={styles.generalFontSize}>Invalid hero!</Text>

    return (
        <View style={styles.container}>
            <IconMaterialCommunityIcons
                name='delete-circle'
                style={styles.icon}
                color='red'
                size={30}
                onPress={this.deleteHero}
            />
            <IconFontAwesome
                name='edit'
                style={styles.icon}
                color='green'
                size={30}
                onPress={this.goToScreenUpdateHero}
            />
            <Text style={styles.generalFontSize}>{this.state.hero.heroName}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row',
        width: '100%',
        marginVertical: 5,
    },
    generalFontSize: {
        fontSize: 20,
    },
    icon: {
        marginHorizontal: 5,
    },
});

export default withNavigation(HeroView);
