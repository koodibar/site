---
layout: post
title: "Finite State Machine trong web development"
author: Dr.Yami
tags: ["Programming"]
image: img/vintage-cash-register.jpg
date: "2018-12-06T18:00:00.000Z"
---

## Giới thiệu Finite State Machine
> Finite State Machine (FSM) đưa ra khái niệm về trạng thái (state) và lịch sử hoạt động của nó. FSM bao gồm hữu hạn các trạng thái của hệ thống, lưu trữ cách hệ thống đi đến trạng thái đó như thế nào và có các cách xử lý các dữ liệu đầu vào (input) khác nhau dựa trên trạng thái hiện tại. FSM có thể thay đổi trạng thái dựa trên input, sự thay đổi này gọi là transition.  
_(Wagner, Schmuki, Wagner & Wolstenholme, 2006)_

> FSM được định nghĩa trong hệ thống bởi một số hữu hạn các trạng thái, trạng thái bắt đầu và điều kiện để thay đổi giữa các trạng thái.

Để cho dễ hiểu thì ta có thể tham khảo đồ thị sau
!["State Flowchart"](/img/finite-state-machine/state-flowchart.png)  
_(Nystrom, 2014)_

Đồ thị trên mô tả sơ bộ về một FSM, với 4 trạng thái là `Standing`, `Ducking`, `Jumping` và `Diving`, trạng thái bắt đầu có thể hiểu là `Standing` (trong game, nhân vật lúc nào cũng đứng yên chờ người chơi ấn nút) và các điều kiện để thay đổi từ trạng thái này sang trạng thái khác (với các nút bấm).

## Công dụng của Finite State Machine
Điều tuyệt vời nhất của FSM là chúng ta luôn có một đồ thị tương ứng với thiết kế, vì vậy FSM giúp ta dễ dàng quản lý các dạng trạng thái của hệ thống mà không phải đào vào vô vàn flags. Chúng ta luôn biết hữu hạn các trạng thái mà hệ thống có thể đạt được dựa vào thiết kế của FSM mà không lo bỏ sót, đồng thời việc thêm hoặc bớt trạng thái rất đơn giản.

Ví dụ ở đồ thị ở trên, muốn nhân vật vừa ngồi vừa dash như Rockman Zero, ta chỉ cần thêm trạng thái `Low Dashing` cạnh `Ducking` và thêm cái mũi tên từ `Ducking` sang `Low Dashing` với điều kiện `Press Y`.

!["State Flowchart 2"](/img/finite-state-machine/diagram2.png)  

Và tất nhiên, với FSM, ta không lo một thằng đang ở trạng thái `Jumping` có thể làm quả Low Dash như Zero do không có điều kiện nào giúp ta đi từ trạng thái `Jumping` sang `Low Dashing`. Điều này không những giúp code của chúng ta ngắn gọn hơn mà còn ít lỗi hơn do không lo vì kiểm tra thiếu một flag nào đó mà hệ thống đi nhầm trạng thái.

## Áp dụng vào web
Lý thuyết là vậy, và ví dụ thì cũng về game, vậy với web thì sao? Thực ra với dân frontend thì ngày ngày vẫn làm việc với một dạng của FSM, đó là router (ví dụ [React Router](https://reacttraining.com/react-router/)). Tại sao router lại là một FSM?

Theo như khái niệm ở trên, router bao gồm một số hữu hạn các routes và các handlers của nó, route khởi tạo (thường là root hay home) và các links hoặc actions để đi từ route này sang route khác. Như vậy với mỗi cặp route và handler, ta có thể hiệu đó là một trạng thái của hệ thống; thay mỗi cặp đó bằng state ta sẽ có router chính là FSM. Không tin bạn có thể sử dụng đúng khái niệm của FSM và tự implement một router cho mình (cho React chẳng hạn), nó hoàn toàn không khó và đáng để thử.

Để dễ hiểu hơn thì ta lấy một ví dụ nó thực tiễn hơn một chút. Ví dụ ta có một hệ thống bài viết, bài viết mới tạo sẽ luôn là `Draft`, muốn được published lên trang nhất, trước tiên ta phải đi từ `Draft` đến `In Review`, rồi chờ các bác editors vote xem có nên đưa lên trang nhất không `In Votes` rồi mới được lên thành `Published`. Nếu tạch một trong 2 bước `In Review` hoặc `In Votes`, bài viết lại được trả về địa phương để `Draft` tiếp. Với naive implementation, code nó sẽ là một rổ flags như sau:

```typescript
interface Post {
  uid: number;
  title: string;

  isDraft: boolean;
  isInReview: boolean;
  isInVote: boolean;
  isPublished: boolean;
  voteCount: number;
}

enum Status { Draft, InReview, InVote, Publish }

const throwUpdateError = () => {};

const updateStatus = (post: Post, status: Status) => {
  if (post.isDraft) {
    if (status === Status.InReview) {
      post.isDraft = false;
      post.isInReview = true;
      console.log("Wait for review");
      return;
    } else {
      throwUpdateError();
      return;
    }
  }

  if (post.isInReview) {
    if (status === Status.Draft) {
      post.isDraft = true;
      post.isInReview = false;
      console.log("Rejected from review");
      return;
    }

    if (status === Status.InVote) {
      post.isInReview = false;
      post.isInVote = true;
      console.log("Wait for vote");
      return;
    }

    throwUpdateError();
  }
  ...
};
```

Vì cái updateStatus nó quá dài và phức tạp trong trường hợp này nên bài viết chỉ viết đến trường hợp bài viết đang chờ được review `In Review`. Vấn đề của cục code ở trên là nó quá dài, quá nhiều flags và khó để thêm bớt trạng thái, chưa kể nếu thêm vài cái flags vào nữa thì việc sót trường hợp là điều thường gặp, dẫn đến logic đi sai hướng (ví dụ tự nhiên từ Draft nhảy lên Published luôn thì rõ là tai hại).

Vậy với FSM thì ta có thể viết lại như này:
```typescript
/**
 * Post structure.
 */
interface Post {
  uid: number;
  title: string;

  voteCount: number;
  state: State;
}

/**
 * Trait of a state
 */
interface State {
  proceed(post: Post): State;
  reject(post: Post): State;
}

/**
 * Draft State in Post FSM
 */
const draftState: State = {
  proceed: (post: Post) => {
    return inReviewState;
  },

  reject: (post: Post) => {
    console.warn("Draft cannot be rejected");
    return draftState;
  }
};

/**
 * In Review State in Post FSM
 */
const inReviewState: State = {
  proceed: (post: Post) => {
    return inVoteState;
  },

  reject: (post: Post) => {
    return draftState;
  }
};

/**
 * In Vote State in Post FSM
 */
const inVoteState: State = {
  proceed: (post: Post) => {
    if (post.voteCount < 5) {
      console.warn("Vote count must be >= 5 to be publised");
      return inVoteState;
    }
    return publishedState;
  },

  reject: (post: Post) => {
    return draftState;
  }
};

/**
 * Published State in Post FSM
 */
const publishedState: State = {
  proceed: (post: Post) => {
    console.warn("Published cannot be processed anymore");
    return publishedState;
  },

  reject: (post: Post) => {
    console.warn("Go to draft again.");
    return draftState;
  }
};

/**
 * Proceed action in FSM
 */
const proceedPost = (post: Post) => {
  post.state = post.state.proceed(post);
};

/**
 * Reject action in FSM
 */
const rejectPost = (post: Post) => {
  post.state = post.state.reject(post);
};

/**
 * Delegate action for FSM
 */
const updatePost = (post: Post, action: "proceed" | "reject") => {
  if (action === "proceed") {
    proceedPost(post);
  }

  if (action === "reject") {
    rejectPost(post);
  }
};
```

Như vậy với mỗi trạng thái thì ta sẽ có một object implement `State trait` (ở đây ta hiểu là States cho Post FSM), và FSM này sẽ nhận và xử lý 2 hành động chính là `Proceed` và `Reject`. Hệ thống mỗi lần nhận 1 trong 2 hành động này sẽ delegate đến State hiện tại và State sẽ xử lý đồng thời trả lại State mới (vì vậy mới gọi là Finite). Như vậy ta không cần phải kiểm tra một loạt flags nữa, đồng thời muốn thêm một trạng thái mới cho bài viết, ví dụ Archive - trạng thái cho các bài viết đã published và quá cũ, ta chỉ cần thêm 1 object implement `State trait` và điều chỉnh action handlers cho `publishedState`, điều này giúp ta hoàn toàn không phải động vào các states còn lại, đảm bảo tính chính xác của hệ thống.

Nếu muốn chuyển object Post ở trên thành dạng flatten, thích hợp cho gửi lên service, ta có thể thêm method `getStatus(): string` cho `State trait`, states sẽ trả lại status tương ứng cho post.

## Kết
- Để implement FSM, ta có thể lựa chọn implement bằng tay như ví dụ trên hoặc sử dụng bất kì library FSM nào.
- Với State, ta có thể thêm các method vào như `transition()`, `start()` hoặc `end()` để xử lý giữa việc chuyển đổi các trạng thái dễ dàng hơn.
- FSM giúp decouple các trạng thái, giảm tối đa khả năng gặp lỗi khi thay đổi trạng thái của app.
- Với Finite States, ta sẽ có Finite Actions. Tức là sẽ không có chuyện một action lạ hoắc lạ huơ nào nhẩy vào hệ thống của chúng ta thay đổi trạng thái lung tung.

## Tham khảo
- [Wagner, F., Schmuki, R., Wagner, T., & Wolstenholme, P. (2006). Modeling software with finite state machines. Estados Unidos: Auerbach Publications](https://www.amazon.com/Modeling-Software-Finite-State-Machines/dp/0849380863)
- [Nystrom, R. (2014). Game programming patterns. Lexington, KY.: Genever Benning](http://gameprogrammingpatterns.com/)
- [Wikipedia - Finite State Machine](https://en.wikipedia.org/wiki/Finite-state_machine)

## Other notes
- Ý tưởng của hệ thống bài viết trong mục áp dụng học hỏi từ bài viết [FSM của Dung Nguyen](https://kipalog.com/posts/Finite-state-machine-trong-lap-trinh---Elixir)