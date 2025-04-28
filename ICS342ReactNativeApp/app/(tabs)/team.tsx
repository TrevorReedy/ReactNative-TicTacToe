import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function teamMemberScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Team Members</ThemedText>
      </ThemedView>
      <ThemedText>Say hi to our team members</ThemedText>
      <Collapsible title="Jaileia Yang">
        <ThemedText>
            Hi! <br></br>
            My name is Jaileia Yang and I am majoring in Computer Information Technology.
            This is my last semester here at Metropolitan State University and I will be graduating
            this Spring. I am happy to have been a part of this group as it has taught me so much
            about React Native. A fun fact about me is that I enjoy UX design!
        </ThemedText>
      </Collapsible>
      <Collapsible title="Natalia Johnson">
        // Insert your items here
      </Collapsible>
      <Collapsible title="Nick Kelley">
        <ThemedText>
          Hi there! <br></br>
          I'm Nick Kelley, currently a junior at Metro State majoring in Computer Science.
          I like working on computers because it is difficult and challenging, plus its a skill that
          most people don't have. This class was my first glimpse into mobile development and
          I found it very engaging!
        </ThemedText>
      </Collapsible>
      <Collapsible title="Noah Willgohs">
        // Insert your items here
      </Collapsible>
      <Collapsible title="Rayleigh Thai">
        {/* // Insert your items here */}
        <ThemedText>
            Hello there, I'm Ray. <br></br>
            Currently Student at Metropolitan State University studying Computer Science. 
            I'm interest in Network Security and Software Development. 
            Sometime, bugs spawn in least likely to be noticed in development process that 
            eventually cause your hairloss go faster. I like to play video games in my free time
             to escape reality and potential hairloss. 😁
        </ThemedText>
      </Collapsible>
      <Collapsible title="Trevor Reedy">
        <ThemedText>
        Hello! {"\u263A"} <br></br>
        Hello, my name is Trevor, and I am currently a junior at Metropolitan State 
        University with a strong passion for software development. I am particularly drawn 
        to working with real-world data and leveraging my skills to manipulate and analyze it 
        in ways that provide value to users. I find it incredibly rewarding to transform complex, 
        often chaotic data into meaningful insights and solutions.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
