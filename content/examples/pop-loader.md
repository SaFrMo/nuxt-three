For this one, I want to recreate the incredible [Chris Gannon's](https://codepen.io/chrisgannon/) [ShuffleQueue Loader](https://codepen.io/chrisgannon/pen/xmQeze?editors=0010):

<p data-height="265" data-theme-id="light" data-slug-hash="xmQeze" data-default-tab="result" data-user="chrisgannon" data-pen-title="ShuffleQueue Loader" class="codepen">See the Pen <a href="https://codepen.io/chrisgannon/pen/xmQeze/">ShuffleQueue Loader</a> by Chris Gannon (<a href="https://codepen.io/chrisgannon">@chrisgannon</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

This is a gorgeous animation, but it uses, [GSAP](https://greensock.com/gsap), which I haven't used before. I really like working with [Popmotion](https://popmotion.io/), so I'd like to try to emulate the smoothness of GSAP with a toolset I'm more familiar with.

We'll start by recording the end result so we can analyze frame-by-frame. There are two basic parts to this animation:

1.  The dot that travels under the entire row (let's call it the "traveler"):

    ![Four screenshots showing the dot in different positions](/images/traveler.png)

1.  The dots that bounce and shift left. Each of these dots has the same animation, just delayed as they move down the row, so let's focus on one:

    ![](/images/storyboard-1.png)

    ![](/images/storyboard-2.png)
